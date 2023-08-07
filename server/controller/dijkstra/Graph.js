// const result = {};

// array.forEach(item => {
// const { province_id_1, province_id_2, distance } = item;

// if (!result[province_id_1]) {
//     result[province_id_1] = {};
// }

// result[province_id_1][province_id_2] = distance;
// });

// console.log(result);

const Graph = {
    "1": {
        "12": 150,
        "14": 61,
        "20": 27,
        "28": 33,
        "33": 65,
        "61": 72
    },
    "2": {
        "8": 60,
        "19": 39,
        "30": 53
    },
    "3": {
        "12": 80,
        "28": 90,
        "33": 90,
        "51": 100
    },
    "4": {
        "6": 18,
        "24": 48,
        "36": 86,
        "49": 116
    },
    "5": {
        "13": 59,
        "24": 196,
        "36": 137,
        "60": 70
    },
    "6": {
        "4": 18,
        "24": 28,
        "26": 29,
        "27": 77,
        "29": 104,
        "31": 54
    },
    "7": {
        "39": 98,
        "51": 85,
        "58": 58,
        "59": 61,
        "61": 54
    },
    "8": {
        "2": 60,
        "10": 26,
        "19": 34,
        "30": 26,
        "53": 25
    },
    "9": {
        "21": 151,
        "45": 40,
        "47": 59,
        "48": 38
    },
    "10": {
        "8": 26,
        "19": 41
    },
    "11": {
        "16": 122,
        "38": 140,
        "43": 56
    },
    "12": {
        "1": 150,
        "3": 80,
        "33": 84,
        "51": 102
    },
    "13": {
        "5": 59,
        "22": 153,
        "36": 108,
        "60": 120
    },
    "14": {
        "1": 61,
        "20": 59,
        "28": 51,
        "30": 167,
        "33": 66,
        "51": 84,
        "61": 62
    },
    "15": {
        "46": 184,
        "47": 33,
        "48": 107,
        "57": 99
    },
    "16": {
        "11": 122,
        "17": 61,
        "21": 60,
        "32": 83,
        "34": 201
    },
    "17": {
        "16": 61,
        "38": 74
    },
    "18": {
        "29": 215,
        "35": 133,
        "37": 225,
        "52": 114
    },
    "19": {
        "2": 39,
        "8": 34,
        "10": 41,
        "38": 102
    },
    "20": {
        "1": 27,
        "14": 59,
        "39": 60,
        "58": 81,
        "61": 36
    },
    "21": {
        "9": 151,
        "16": 60,
        "34": 52,
        "45": 202,
        "48": 201
    },
    "22": {
        "13": 153,
        "37": 123,
        "60": 155,
        "63": 166
    },
    "23": {
        "24": 51,
        "31": 31,
        "40": 20
    },
    "24": {
        "4": 48,
        "5": 196,
        "6": 28,
        "23": 51,
        "26": 61,
        "27": 102,
        "29": 69,
        "31": 15,
        "37": 297,
        "49": 155,
        "54": 71,
        "60": 151,
        "62": 43,
        "63": 183
    },
    "25": {
        "41": 28,
        "46": 136,
        "50": 186,
        "57": 245
    },
    "26": {
        "6": 29,
        "24": 61,
        "27": 46,
        "29": 130,
        "31": 19,
        "49": 145,
        "54": 55
    },
    "27": {
        "6": 77,
        "24": 102,
        "26": 46,
        "31": 65,
        "40": 68,
        "54": 47
    },
    "28": {
        "1": 33,
        "3": 90,
        "14": 51,
        "33": 116,
        "51": 59,
        "58": 87
    },
    "29": {
        "6": 104,
        "18": 215,
        "24": 69,
        "26": 130,
        "31": 66,
        "44": 46,
        "52": 137,
        "55": 145,
        "56": 116
    },
    "30": {
        "2": 53,
        "8": 26,
        "14": 167,
        "33": 201,
        "39": 30,
        "53": 61,
        "61": 124
    },
    "31": {
        "6": 54,
        "23": 31,
        "24": 15,
        "26": 19,
        "27": 65,
        "29": 66,
        "54": 69
    },
    "32": {
        "16": 83,
        "38": 247,
        "43": 59,
        "45": 82
    },
    "33": {
        "1": 65,
        "3": 90,
        "12": 84,
        "14": 66,
        "28": 116,
        "30": 201,
        "51": 160
    },
    "34": {
        "16": 201,
        "21": 52,
        "47": 142
    },
    "35": {
        "18": 133,
        "37": 114
    },
    "36": {
        "4": 86,
        "5": 137,
        "13": 108,
        "49": 80,
        "55": 60
    },
    "37": {
        "18": 225,
        "22": 123,
        "24": 297,
        "35": 114,
        "63": 156
    },
    "38": {
        "11": 140,
        "17": 74,
        "19": 102,
        "32": 247
    },
    "39": {
        "7": 98,
        "20": 60,
        "30": 30,
        "53": 56,
        "58": 51
    },
    "40": {
        "23": 20,
        "27": 68,
        "42": 48,
        "54": 54
    },
    "41": {
        "25": 28,
        "46": 107,
        "56": 78
    },
    "42": {
        "40": 48
    },
    "43": {
        "11": 56,
        "32": 59
    },
    "44": {
        "29": 46,
        "63": 90
    },
    "45": {
        "9": 40,
        "21": 202,
        "32": 82
    },
    "46": {
        "15": 184,
        "25": 136,
        "41": 107,
        "50": 75
    },
    "47": {
        "9": 59,
        "15": 33,
        "34": 142,
        "48": 83,
        "57": 93
    },
    "48": {
        "9": 38,
        "15": 107,
        "21": 201,
        "47": 83
    },
    "49": {
        "4": 116,
        "24": 155,
        "26": 145,
        "36": 80
    },
    "50": {
        "25": 186,
        "46": 75,
        "57": 43
    },
    "51": {
        "3": 100,
        "7": 85,
        "12": 102,
        "14": 84,
        "28": 59,
        "33": 160
    },
    "52": {
        "18": 114,
        "29": 137
    },
    "53": {
        "8": 25,
        "30": 61,
        "39": 56
    },
    "54": {
        "24": 71,
        "26": 55,
        "27": 47,
        "31": 69,
        "40": 54
    },
    "55": {
        "29": 145,
        "36": 60
    },
    "56": {
        "29": 116,
        "41": 78
    },
    "57": {
        "15": 99,
        "25": 245,
        "47": 93,
        "50": 43
    },
    "58": {
        "7": 58,
        "20": 81,
        "28": 87,
        "39": 51,
        "61": 38
    },
    "59": {
        "7": 61
    },
    "60": {
        "5": 70,
        "13": 120,
        "22": 155,
        "24": 151
    },
    "61": {
        "1": 72,
        "7": 54,
        "14": 62,
        "20": 36,
        "30": 124,
        "58": 38
    },
    "62": {
        "24": 43
    },
    "63": {
        "22": 166,
        "24": 183,
        "37": 156,
        "44": 90
    }
}

module.exports = Graph;