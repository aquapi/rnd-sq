// @ts-check
import defaultMap from "../utils/map";
import React from "react";
import Game from "../components/Game";
import Player from "../utils/Player";
import useForceUpdate from "../utils/useForceUpdate";
import Menu from "../components/Menu";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import findStart from "../utils/findStart";

export default function Home() {
	const [map] = React.useState(defaultMap);
	// @ts-ignore
	const player = React.useMemo(() => new Player(map), [map]);
	const rerender = useForceUpdate();

	/**
	 * @type {(this: Window, ev: KeyboardEvent) => any} 
	 */
	const move = e => {
		// Key events
		if (e.key === "ArrowUp")
			player.go("up");

		if (e.key === "ArrowDown")
			player.go("down");

		if (e.key === "ArrowLeft")
			player.go("left");

		if (e.key === "ArrowRight")
			player.go("right");

		// If the player lost, show a notification and restart the game
		if (player.hasLost()) {
			NotificationManager.error("You touched X. Now you need to go again from the beginning!");
			player.restart();
		}

		// Update the UI
		rerender();
	}

	React.useEffect(() => {
		window.addEventListener("keydown", move);
		return () => window.removeEventListener("keydown", move);
	});

	// Render the game and the control bar
	return <>
		<Game map={player.field} pos={player.position} />
		<Menu player={player} />
		<NotificationContainer />
	</>;
}

/**
 * Map:
 * 0: sq-empty
 * 1: sq-road
 * 2: sq-x
 * 3: sq-start
 */