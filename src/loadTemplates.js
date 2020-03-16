import {
    TemplateLibrary
} from '@accordproject/cicero-core';
import {
    version as ciceroVersion
} from '@accordproject/cicero-core/package.json';


/**
 * Load the Accord Project templates
 * @returns {Promise} the array of template metadata
 */
async function loadTemplates() {
    const templateLibrary = new TemplateLibrary();
    const templateIndex = await templateLibrary
        .getTemplateIndex({
            latestVersion: true,
            ciceroVersion
        });
    const templateIndexArray = Object.values(templateIndex);
    return templateIndexArray;
}

export default loadTemplates;