const costCalc = (input) => {
    let price;
    let multiplierLang;
    let multiplierMime;
    let count = input.count;
    switch (input.language) {
        case 'ukr':
            multiplierLang = 0.05;
            break;
        case 'rus':
            multiplierLang = 0.05;
            break;
        case 'en':
            multiplierLang = 0.12;
            break;
    }
    switch (input.mimetype) {
        case 'none':
            multiplierMime = 0;
            return 'Please select extension of the file';
            break;
        case 'doc':
            multiplierMime = 1.0;
            break;
        case 'docx':
            multiplierMime = 1.0;
            break;
        case 'rtf':
            multiplierMime = 1.0;
            break;
        case 'other':
            multiplierMime = 1.2;
            break;
    }
    price = multiplierLang * multiplierMime * count;
    switch (true) {
        case price < 120 && input.language === 'en' && input.mimetype === 'other':
            price = 144;
            break;
        case price < 120 && input.language === 'en':
            price = 120;
            break;
        case price < 50 && input.language === 'ukr':
            price = 50;
            break;
        case price < 50 && input.language === 'rus':
            price = 50;
            break;
        default:
            price = price;
    }
    return price;
};

module.exports = costCalc;
