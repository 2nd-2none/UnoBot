async function getHand(bot, player, players) {
	let p = player;
	if (player.name) {
		p = player.name;
	}
	const user = await bot.users.fetch(p);

	const handArr = bot.unogame.getPlayer(p).hand; // .toString().toLowerCase().split(",");
	const hand = [];
	for (const card of handArr) {
		if (card.value.toString() === "WILD") {
			hand.push("wild");
		} else if (card.value.toString() === "WILD_DRAW_FOUR") {
			hand.push("WD4");
		} else if (card.value.toString() === "DRAW_TWO") {
			hand.push(`${card.color.toString().toLowerCase()} DT`);
		} else {
			hand.push(card.toString().toLowerCase());
		}
	}
	let sendTo = bot.webhooks.uno;
	if (players && !players.includes(bot.user.id) && bot.webhooks.uno.id !== user.id) {
		// A player did the hand command in DM during player-to-player game while not on their turn
		sendTo = user;
	}
	return {
		hand: hand.join(", "),
		sendTo,
		user,
	}; // If only inline DMs were a thing - direct msg works but is annoying
	// send(sendTo, `${user} Your Uno hand: ${hand.join(", ")}`);
}

module.exports = getHand;
