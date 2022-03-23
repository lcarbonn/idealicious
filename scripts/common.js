export const convertToCSV = (ideas, separator) => {
    const comma = !separator ? ',' : separator
    let str = ''
    for (var i = 0; i < ideas.length; i++) {
        const deck = ideas[i]
        for (var j = 0; j < deck.length; j++) {
            let line = ''
            const idea = deck[j]
            line += idea.deckId + comma
            line += "\"" + idea.message.trim().replace(/\"/g, "\"\"") + "\"" + comma
            line += idea.loved
            str += line + '\r\n'
        }
    }
    return str
}

export const exportCSVFile = (ideas, fileTitle, separator) => {
    const comma = !separator ? ',' : separator
    const header = "Deck" + comma + "Message" + comma+"Votes\r\n"
    let csv = convertToCSV(ideas, comma);
    csv = header + csv
    const exportedFilenmae = fileTitle + '.csv' || 'export.csv'; // eslint-disable-line
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
