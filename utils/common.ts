export const convertPlayers = (separator:string, lovingPlayers:String[], players:IPlayer[]) => {
    const comma = separator==',' ? ';' : separator
    let list = ""
    let i=0
    lovingPlayers.forEach((lovingPlayer) => {
        players.forEach((player) => {
            if(lovingPlayer == player.uid) {
                if(i++>0) list += comma
                list += player.name
            }
        })
    })
    return list
}

export const convertToCSV = (separator:string, ideas:IIdea[][], players:IPlayer[]) => {
    const comma = !separator ? ',' : separator
    let str = ''
    for (var i = 0; i < ideas.length; i++) {
        const deck = ideas[i]
        for (var j = 0; j < deck.length; j++) {
            let line = ''
            const idea = deck[j]
            // line += idea.deckId + comma
            line += i + comma
            line += "\"" + idea.message.trim().replace(/\"/g, "\"\"") + "\"" + comma
            line += idea.loved + comma
            line += convertPlayers(separator, idea.lovingPlayers, players)
            str += line + '\r\n'
        }
    }
    return str
}

export const exportCSVFile = (id:string,  separator:string, ideas:IIdea[][], players:IPlayer[]) => {
    const fileTitle = "Idealicious-ideas-"+id
    const comma = !separator ? ',' : separator
    const header = "Deck" + comma + "Message" + comma +"Votes"+ comma + "Players"+ "\r\n"
    let csv = convertToCSV(comma, ideas, players);
    csv = header + csv
    const exportedFileName = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export const dateFormatter = (date:unknown) => {
    if(!date) return ""
    const d = new Date(date as any as number)
    return d.toLocaleDateString() +" "+ d.toLocaleTimeString()
}

export const  getColor = (id:number) => {
    const color = id % 5
    return "bg-postit"+color
}