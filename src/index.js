const player1 = {
  NAME : "Mario",
  VELOCITY: 4,
  MANEUVERABILITY: 3,
  POWER: 3,
  POINTS: 0,
}

const player2 = {
  NAME : "Luigi",
  VELOCITY: 3,
  MANEUVERABILITY: 4,
  POWER: 4,
  POINTS: 0,
}

function rollDice () {
  return Math.floor(Math.random() * 6)+1
}

async function getRandomBlock () {
  let random = Math.random();
  let result

  switch(true){
    case random < 0.33:
      result = "RETA"
      break;
    
    case random < 0.66:
      result = "CURVA"
      break;

    default:
      result = "CONFRONTO"
      break
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${attribute + diceResult}`)
} 

async function confrontType() {
  let random = Math.random();
  let result

  switch(true){
    case random < 0.65:
      result = "Casco"
      break;

    default: 
      result = "Bomba"
      break;
    }
  
  return result;
}

async function shouldPlayerGainPoint(){
  let random = Math.random();
  let result

  switch(true){
    case random < 0.40:
      result = false
      break;

    default: 
      result = true
      break;
    }
  
  return result;
}

async function playRaceEngine (character1, character2) {
  for( let round=1; round<=5; round++ ){
    console.log(`Rodada ${round}`)

    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`)

    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

    if( block === "RETA" ){
      totalTestSkill1 = diceResult1 + character1.VELOCITY
      totalTestSkill2 = diceResult2+ character2.VELOCITY
      await logRollResult(character1.NAME, "velocidade", diceResult1, character1.VELOCITY)
      await logRollResult(character2.NAME, "velocidade", diceResult2, character2.VELOCITY)
    }
    
    if( block === "CURVA" ){
      totalTestSkill1 = diceResult1 + character1.MANEUVERABILITY
      totalTestSkill2 = diceResult2+ character2.MANEUVERABILITY
      await logRollResult(character1.NAME, "manobrabilidade", diceResult1, character1.MANEUVERABILITY)
      await logRollResult(character2.NAME, "manobrabilidade", diceResult2, character2.MANEUVERABILITY)
    }
    
    if( block === "CONFRONTO" ){
      let powerResult1 = diceResult1 + character1.POWER
      let powerResult2 = diceResult2+ character2.POWER
      let type = await confrontType();
      console.log(`O tipo do contronto é ${type}`)
      console.log(`${character1.NAME} confrontou com ${character2.NAME}!`)
      await logRollResult(character1.NAME, "confrontou", diceResult1, character1.POWER)
      await logRollResult(character2.NAME, "confrontou", diceResult2, character2.POWER)

      if (powerResult1 > powerResult2) {
        let winner = character1;
        let loser = character2;
        let pointsToLose = type === "Bomba" ? 2 : 1;
        let pointsToLoseText = type === "Bomba" ? "dois pontos" : "um ponto";

        if (loser.POINTS >= pointsToLose) {
          console.log(`${winner.NAME} venceu o confronto! ${loser.NAME} perdeu ${pointsToLoseText}.`);
          loser.POINTS -= pointsToLose;

          if (await shouldPlayerGainPoint()) {
            console.log(`${winner.NAME} ganhou 1 ponto`);
            winner.POINTS++;
          }
        }
      } else if (powerResult2 > powerResult1) {
        let winner = character2;
        let loser = character1;
        let pointsToLose = type === "Bomba" ? 2 : 1;
        let pointsToLoseText = type === "Bomba" ? "dois pontos" : "um ponto";

        if (loser.POINTS >= pointsToLose) {
          console.log(`${winner.NAME} venceu o confronto! ${loser.NAME} perdeu ${pointsToLoseText}.`);
          loser.POINTS -= pointsToLose;

          if (await shouldPlayerGainPoint()) {
            console.log(`${winner.NAME} ganhou 1 ponto`);
            winner.POINTS++;
          }
        }
      } else {
        console.log("Empate! Nenhum ponto foi perdido.");
      }
    }

    if(totalTestSkill1 > totalTestSkill2){
      console.log(`${character1.NAME} marcou 1 ponto`)
      character1.POINTS++;
      console.log(`${character1.NAME} pontos: ${character1.POINTS}`)
      console.log(`${character2.NAME} pontos: ${character2.POINTS}`)
    }else if(totalTestSkill2 > totalTestSkill1){
      console.log(`${character2.NAME} marcou 1 ponto`)
      character2.POINTS++;
      console.log(`${character1.NAME} pontos: ${character1.POINTS}`)
      console.log(`${character2.NAME} pontos: ${character2.POINTS}`)
    }

    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final: ")
  console.log(`${character1.NAME}: ${character1.POINTS} ponto(s)`)
  console.log(`${character2.NAME}: ${character2.POINTS} ponto(s)`)

  if(character1.POINTS > character2.POINTS){
    console.log(`\n${character1.NAME} venceu a corrida!`)
  } else if(character1.POINTS < character2.POINTS){
    console.log(`\n${character2.NAME} venceu a corrida!`)
  }else{
    console.log("A corrida terminou empatada!")
  }
}

( async function main () {
  console.log(`Corrida entre ${player1.NAME} e ${player2.NAME} começando...\n`)
  
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2)
} )()