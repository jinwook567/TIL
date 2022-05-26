function solution(numbers) {
    //조합 함수를 쓰지 않고 어떤 방식이 있을까.
    const getCombinations =(arr, selectedNum) => {
        const results = []
        if(selectedNum === 1) return arr.map(v => [v])
        arr.forEach((item, index, origin) => {
            const rest = origin.slice(index+1)
            const combinations = getCombinations(rest, selectedNum -1)
            const attached = combinations.map(combi => [item, ...combi])
            results.push(...attached)
        })
        return results
    }
    
    const combinations = getCombinations(numbers, 2)
    const convertedNums = combinations.map(combi => {
        return combi.reduce((acc, cur) => acc + cur, 0)
    })
    return [...new Set(convertedNums)].sort((x,y) => x-y)    
}

function refactoring(numbers){
    //조합의 경우를 그냥 for문으로 구현.
    
}
