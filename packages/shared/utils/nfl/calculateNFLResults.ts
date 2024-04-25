export default function calculateNFLResults(data: any[], round = 1) {
    const totalQuestions = 5; // Fixed number of questions per team
    let results: {
        teamId: any; answers: number; points: number; bonus: number; // Bonus points as a separate property
    }[] = [];
    let teamsData = data.filter(entry => entry.meta_key.split('_')[1] === `${round}`);
    let uniqueTeams = new Set(teamsData.map(entry => entry.meta_key.split('_')[2]));

    uniqueTeams.forEach(team => {
        let questionsAnswered = [];

        teamsData.forEach(entry => {
            const [_, entryRound, entryTeam, question] = entry.meta_key.split('_');
            if (entryTeam === team) {
                questionsAnswered.push(parseInt(question));
            }
        });

        const numAnswers = questionsAnswered.length;
        const teamPoints = numAnswers * 10; // Only correct answer points
        const bonus = numAnswers === totalQuestions ? 20 : 0; // Bonus points, not added to teamPoints

        results.push({
            teamId: team,
            answers: numAnswers,
            points: teamPoints,
            bonus: bonus // Bonus points as a separate property
        });
    });

    return { results };
}