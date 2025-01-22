export const shuffleArray = (array) => {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


export const shuffleQuestions = (array, triggers) => {
    for (let i = 24; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    const adjustedArray = [...array];
    // console.log("without trigger", adjustedArray);

    // console.log("triggers", triggers);

    triggers.forEach(trigger => {
        const { questionId, triggerAfter } = trigger; 

        // finding index of questionaId and triggerafter
        const questionIndex = adjustedArray.findIndex(q => q.id === questionId); 
        if (questionIndex !== -1) {
            const triggerIndex = adjustedArray.findIndex(q => q.id === triggerAfter);

            // console.log("questionIndex", questionIndex, triggerIndex)
            if (triggerIndex !== -1 && questionIndex + 1 !== triggerIndex) {
                [adjustedArray[questionIndex+1], adjustedArray[triggerIndex]] = [adjustedArray[triggerIndex], adjustedArray[questionIndex+1]];
            }
        }
    });
    return adjustedArray;
}