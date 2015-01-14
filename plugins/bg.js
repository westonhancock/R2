var leftRe = /(?!left.*\/)(left)(?=.*\))/g,
	rightRe = /(?!right.*\/)(right)(?=.*\))/g,

	plug = function(r2) {
		var r2bg = function(v) {
			var ltrValChanged = false;

			if (leftRe.test(v)) {
				v = v.replace(leftRe, 'right');
			}
			else if (rightRe.test(v)){
				v = v.replace(rightRe, 'left');
			}

			if (v.match(/(?!left.*\))(\bleft\b)/)) {
				v = v.replace(/(?!left.*\))(\bleft\b)/, 'right');
				ltrValChanged = true;
			} else if (v.match(/(?!right.*\))(\bright\b)/)) {
				v = v.replace(/(?!right.*\))(\bright\b)/, 'left');
				ltrValChanged = true;
			}

			var m = v.trim().split(/\s+/);

			if (m && m.length > 1) {
				v = m[0];

				for (i = 1; i < m.length; i++) {
					if (m[i].match(/\d+%/) && (ltrValChanged != true)) {
						v += ' ' + (100 - parseInt(m[i], 10)) + '%';
						ltrValChanged = true;
					}
					else {
						v += ' ' + m[i];
					}
				}
			}

			return v;
		}

		r2.valueMap['background-image'] = r2bg;
		r2.valueMap['background'] = r2bg;
	};

module.exports.plug = plug;