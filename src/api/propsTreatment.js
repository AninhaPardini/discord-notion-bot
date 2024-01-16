const propsTreatment = (props) => {
    for (const key in props) {
        console.log(`${key}: ${props[key]}`);
        const prop = props[key];
        switch (prop.type) {
        case 'checkbox':
            return {
                name: `${prop.name}`,
            };
        case 'created_by':
            return {
                name: `${prop.name}`,
            };
        case 'created_time':
            return {
                name: `${prop.name}`,
            };
        case 'date':
            return {
                name: `${prop.name}`,
            };
        case 'email':
            return {
                name: `${prop.name}`,
            };
        case 'files':
            return {
                name: `${prop.name}`,
            };
        case 'formula':
            return {
                name: `${prop.name}`,
            };
        case 'last_edited_by':
            return {
                name: `${prop.name}`,
            };
        case 'last_edited_time':
            return {
                name: `${prop.name}`,
            };
        case 'multi_select':
            return {
                name: `${prop.name}`,
            };
        case 'number':
            return {
                name: `${prop.name}`,
            };
        case 'people':
            return {
                name: `${prop.name}`,
            };
        case 'phone_number':
            return {
                name: `${prop.name}`,
            };
        case 'relation':
            return {
                name: `${prop.name}`,
            };
        case 'rollup':
            return {
                name: `${prop.name}`,
            };
        case 'select':
            return {
                name: `${prop.name}`,
                select: prop.select.name,
            };
        case 'status':
            return {
                name: `${prop.name}`,
                select: prop.select.name,
            };
        case 'rich_text':
            return {
                name: `${prop.name}`,
            };
        case 'title':
            return {
                name: `${prop.name}`,
            };
        case 'url':
            return {
                name: `${prop.name}`,
            };
        default:
            return {
                name: `${prop.name}`,
            };
        }
    }
};

module.exports = propsTreatment;

