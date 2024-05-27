const tiles = ['fan', 'ga', 'al', 'nis', 'ing', 'ry', 'tic', 'nt', 'wn', 'ity', 'to', 'cie', 'li', 'ar', 'tas', 'pecu', 'do', 'om', 'pur', 'siz'];
const groupings = [1, 2, 3, 4];

const groups = [
	{ title: '1 Tile Words', words: [] },
	{ title: '2 Tile Words', words: [] },
	{ title: '3 Tile Words', words: [] },
	{ title: '4 Tile Words', words: [] },
];

for (let i = 0; i < groupings.length; i++) {
	const groupSize = groupings[i];

	if (groupSize === 1) {
		for (let j = 0; j < tiles.length; j++) {
			const firstTile = tiles[j];
			groups[0].words.push(firstTile);
		}
	} else if (groupSize === 2) {
		for (let j = 0; j < tiles.length; j++) {
			const firstTile = tiles[j];
			for (let k = 0; k < tiles.length; k++) {
				const secondTile = tiles[k];
				groups[1].words.push(firstTile + secondTile);
			}
		}
	} else if (groupSize === 3) {
		for (let m = 0; m < tiles.length; m++) {
			const firstTile = tiles[m];
			for (let n = 0; n < tiles.length; n++) {
				const secondTile = tiles[n];
				for (let o = 0; o < tiles.length; o++) {
					const thirdTile = tiles[o];
					groups[2].words.push(firstTile + secondTile + thirdTile);
				}
			}
		}
	} else if (groupSize === 4) {
		for (let m = 0; m < tiles.length; m++) {
			const firstTile = tiles[m];
			for (let n = 0; n < tiles.length; n++) {
				const secondTile = tiles[n];
				for (let o = 0; o < tiles.length; o++) {
					const thirdTile = tiles[o];
					for (let p = 0; p < tiles.length; p++) {
						const fourthTile = tiles[p];
						groups[3].words.push(firstTile + secondTile + thirdTile + fourthTile);
					}
				}
			}
		}
	}
}

for (let group of groups) {
	group.validatedWords = await checkWords(group.words);
}

for (let group of groups) {
	console.log('====' + group.title + '====');
	console.log(group.validatedWords);
}

function wait(delay) {
	return new Promise(resolve => setTimeout(() => resolve(`Waited for ${delay}ms.`), delay));
}

async function checkWords(words) {
	const validWords = [];
	let valid = 0;
	let invalid = 0;
	for (let word of words) {
		try {
			const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
			const data = await res.json();

			if (data.title === undefined) {
				validWords.push(word);
				console.log(`word: ${word}, status: valid, count (v/i): ${++valid}/${invalid}`);
			} else { console.log(`word: ${word}, status: invalid, count (v/i): ${valid}/${++invalid}`); }
			await wait(500);
		} catch(err) {
			console.log(`Error: ${err}`);
		}
	}

	const uniqueValidWords = [...new Set(validWords)];

	return uniqueValidWords;
}
