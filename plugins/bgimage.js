var urlRegexp = /url\(.*(right|left)+/,

	leftRe = /left/g,
	rightRe = /right/g,

	plug = function(r2) {
		var r2bg = function(v) {
			if (urlRegexp.test(v)) {
				if (leftRe.test(v)) {
					v = v.replace(leftRe, 'right');
				}
				else {
					v = v.replace(rightRe, 'left');
				}
			}

			return v;
		}

		r2.valueMap['background-image'] = r2bg;
		r2.valueMap['background'] = r2bg;
	};

module.exports.plug = plug;