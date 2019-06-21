const assert = chai.assert;

describe('doZip', function() {
    it('should zip two arrays', function() {
        let arr1 = [1,2,3,4,5];
        let arr2 = ["1","2","3","4","5"];
        let res = doZip(arr1, arr2);
        assert.deepEqual(res, [[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"]]);
    });
});

describe('upgradeForm', function() {
    it('should build input items', function() {
        let arr1 = ["CODICEBUS","CODICEFRAME","CODICEEVENTO","DSNOME"];
        let str1 = "1;2;3;4";
        upgradeForm(arr1, str1);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,1|cercaCODICEFRAME,2|cercaCODICEEVENTO,3|cercaDSNOME,4");
    });
    it('should filter NO values', function() {
        let arr1 = ["CODICEBUS","CODICEFRAME","CODICEEVENTO","DSNOME"];
        let str1 = "NO;2;NO;4";
        upgradeForm(arr1, str1);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,|cercaCODICEFRAME,2|cercaCODICEEVENTO,|cercaDSNOME,4");
    });
});

describe('processStr', function() {
    it('should build input items from (riceprev, string)', function() {
        let key1 = "riceprev";
        let str1 = "1;2;3;4;5;6;7;8;9";
        processStr(key1, str1);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,1|cercaCODICEFRAME,2|cercaCODICEEVENTO,3|cercaDSNOME,4|cercaDSCOGNOME,5|cercaDTSOTTDA,6|cercaDTSOTTA,7|cercaDSPROD,8|cercaNUPREV,9");
    });
    it('should build input items from (ricepol, string)', function() {
        let key2 = "ricepol";
        let str2 = "1;2;3;4;5;6;7;8;9;10";
        processStr(key2, str2);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,1|cercaCODICEFRAME,2|cercaCODICEEVENTO,3|cercaDSNOME,4|cercaDSCOGNOME,5|cercaDTSOTTDA,6|cercaDTSOTTA,7|cercaDSPROD,8|cercaCDFISC,9|cercaNUPROP,10");
    });
    it('should filter NO values from (riceprev, string)', function() {
        let key1 = "riceprev";
        let str1 = "1;2;NO;4;NO;6;NO;8;NO";
        processStr(key1, str1);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,1|cercaCODICEFRAME,2|cercaCODICEEVENTO,|cercaDSNOME,4|cercaDSCOGNOME,|cercaDTSOTTDA,6|cercaDTSOTTA,|cercaDSPROD,8|cercaNUPREV,");
    });
    it('should filter NO values from (ricepol, string)', function() {
        let key2 = "ricepol";
        let str2 = "1;NO;3;4;5;NO;NO;NO;9;10";
        processStr(key2, str2);
        let inputs = [...document.getElementById("falseForm").elements].map(e => `${e.getAttribute("id")},${e.getAttribute("value")}`).join("|");
        assert.equal(inputs, "cercaCODICEBUS,1|cercaCODICEFRAME,|cercaCODICEEVENTO,3|cercaDSNOME,4|cercaDSCOGNOME,5|cercaDTSOTTDA,|cercaDTSOTTA,|cercaDSPROD,|cercaCDFISC,9|cercaNUPROP,10");
    });
});