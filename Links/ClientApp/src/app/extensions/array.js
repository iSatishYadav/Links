"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
};
Array.prototype.groupByCount = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] != null ? groups[val] + 1 : 1;
        //groups[val] = groups[val] + 1;
        return groups;
    }, {});
};
//# sourceMappingURL=array.js.map