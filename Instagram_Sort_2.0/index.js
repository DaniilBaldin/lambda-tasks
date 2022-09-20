console.time('Time passed:');
const fs = require('fs');

const uniqueValues = async () => {
    try {
        let result = [];
        for (let i = 0; i < 20; i++) {
            const duplicates = await fs.readFileSync(`./data/out${i}.txt`, 'utf-8');
            const unique = new Set(duplicates.split('\n'));
            result.push(unique);
        }
        const uniqueElements = new Set(result.reduce((a, c) => a.concat([...c]), []));
        let inEveryFile = [];
        uniqueElements.forEach((uniqueEl) => {
            let counter = 0;
            result.forEach((el) => {
                if (el.has(uniqueEl)) {
                    counter++;
                    if (counter === 20) {
                        inEveryFile.push(uniqueEl);
                    }
                }
            });
        });
        let inTenFiles = [];
        uniqueElements.forEach((uniqueEl) => {
            let counter = 0;
            result.forEach((el) => {
                if (el.has(uniqueEl)) {
                    counter++;
                    if (counter === 10) {
                        inTenFiles.push(uniqueEl);
                    }
                }
            });
        });
        console.log(`Unique values in all files: ${uniqueElements.size}`);
        console.log(`Number of unique combinations for 20 files: ${inEveryFile.length}`);
        console.log(`Number of unique combinations for 10 files: ${inTenFiles.length}`);
    } catch {
        (err) => {
            if (err) console.log(err.message);
        };
    }
};

uniqueValues();

console.timeEnd('Time passed:');
