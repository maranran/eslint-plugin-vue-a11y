
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/media-has-caption.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = 'Media elements such as <audio> and <video> must have a <track> for captions.';

const MEDIA_TYPES = ['audio', 'video'];

const schema = generateObjSchema({
  audio: arraySchema,
  video: arraySchema,
  track: arraySchema,
});


const isMediaType = (context, type) => {
  const options = context.options[0] || {};
  return MEDIA_TYPES.map(mediaType => options[mediaType])
    .reduce((types, customComponent) => types.concat(customComponent), MEDIA_TYPES)
    .some(typeToCheck => typeToCheck === type);
};

const isTrackType = (context, type) => {
  const options = context.options[0] || {};
  return ['track'].concat(options.track || []).some(typeToCheck => typeToCheck === type);
};

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/media-has-caption.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VStartTag" (node) {
        const element = node.parent;
        const type = utils.getElementType(element);
        if (!isMediaType(context, type)) {
          return;
        }
        const mutedProp = utils.getAttribute(element, 'muted');
        const mutedValue = mutedProp && utils.getAttributeValue(mutedProp);
        if (mutedProp && mutedValue.toString() === 'true') {
          return
        }
        const trackChildren = element.children.filter((child) => {
          if (child.type !== 'VElement') {
            return false;
          }
          return isTrackType(context, utils.getElementType(child));
        });
        if (trackChildren.length === 0) {
          context.report({
            node,
            message: errorMessage,
          });
          return;
        }
        const hasCaption = trackChildren.some((track) => {
          const kindProp = utils.getAttribute(track, 'kind');
          const kinddValue = kindProp && utils.getAttributeValue(kindProp);
          return kindProp && kinddValue.toLowerCase() === 'captions';
        });
        if (!hasCaption) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    }, altRule.create(context))
  }
};
