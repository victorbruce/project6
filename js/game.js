// Game object

var Game = {
	
	gridAvailableFields: [],
	
	playerMovementFields: [],
	
	// Init game
	init: function() {
		Game.createGridTable();
		Game.createObstacles();
		Game.createEnergies();
		Game.createWeapons();
		Game.createPlayers();
		Game.setPlayersData();
		Game.hideFightButtons();
		Game.startGame();
	},
	
	// Showing start screen
	showStartScreen: function() {
		startScreenWrapperElem.show();
		gameWrapperElem.hide();
		battleMessageWrapperElem.hide();
		gameOverWrapperElem.hide();
		startButtonElem.on("click",function() {
			startScreenWrapperElem.hide();
			gameWrapperElem.show();
		});
	},
	
	// Getting random number from zero to maximum parameter
	getRandomNumber: function(maximum) {
		var randomNumber = Math.floor(Math.random() * maximum);
		return randomNumber;
	},
	
	// Creating game board table grid
	createGridTable: function() {
		var table = document.createElement("table");
		for (var j=1; j<=gridYFields; j++) {
			var tr = document.createElement("tr");
			for (var i=1; i<=gridXFields; i++) {
				var td = document.createElement("td");
				td.setAttribute("x",Number(i));
				td.setAttribute("y",Number(j));
				var cellXY = [i,j];
				Game.gridAvailableFields.push(cellXY);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}		
		var boardWrapperElem = document.getElementById("board-wrapper");
		boardWrapperElem.appendChild(table);
	},
	
	// Creating obstacle object and placing obstacles on a game board
	createObstacles: function() {
		var tree = new Obstacle("tree","obstacle");
		for (var i=1;i<=numberOfObstacles;i++) {
			Game.placeItem(tree);
		}
	},
	
	// Creating energy object and placing energies on a game board
	createEnergies: function() {
		var energy = new Energy("heart","energy");
		for (var i=1;i<=numberOfEnergies;i++) {
			Game.placeItem(energy);
		}
	},
	
	// Creating weapons objects and placing weapons on a game board
	createWeapons: function() {
		knife = new Weapon("knife","weapon",10,"img/knife.gif");
		sword = new Weapon("sword","weapon",20,"img/sword.gif");
		katana = new Weapon("katana","weapon",30,"img/katana.gif");
		axe = new Weapon("axe","weapon",40,"img/axe.gif");
		spear = new Weapon("spear","weapon",50,"img/spear.gif");
		Game.placeItem(sword);
		Game.placeItem(katana);
		Game.placeItem(axe);
		Game.placeItem(spear);
	},
	
	// Creating player objects and placing players on a game board
	createPlayers: function() {
		player1 = new Player("White Knight","player",1,100,knife);
		player2 = new Player("Black Knight","player",2,100,knife);
		Game.placeItem(player1);
		Game.placeItem(player2);
	},
	
	// Placing item pictures on a game board (by giving grid table cells appropriate css classes)
	placeItem: function(item) {
		var repeat = true;
		while (repeat) {
			var index = Game.getRandomNumber(Game.gridAvailableFields.length);
			switch(item.type) {
				case "obstacle":
					var condition = Game.gridAvailableFields[index][0] !== 1 && Game.gridAvailableFields[index][0] !== gridXFields;
					var cssClassName = item.type;
					break;
				case "energy":
					var condition = Game.gridAvailableFields[index][0] !== 1 && Game.gridAvailableFields[index][0] !== gridXFields;
					var cssClassName = item.type;
					break;
				case "weapon":
					var condition = Game.gridAvailableFields[index][0] !== 1 && Game.gridAvailableFields[index][0] !== gridXFields;
					var cssClassName = item.type;
					var cssClassName2 = item.name;
					break;
				case "player":
					if (item.playerNumber === 1) {
						var condition = Game.gridAvailableFields[index][0] === 1;
					} else {
						var condition = Game.gridAvailableFields[index][0] === gridXFields;
					}
					var cssClassName = item.type + item.playerNumber;
				break;
			}
			if (condition) {
				repeat = false;
			}
		}
		var x = Game.gridAvailableFields[index][0];
		var y = Game.gridAvailableFields[index][1];
		var tdElem = document.querySelector("td[x='" + x + "'][y='" + y + "']");
		if (item.type === "weapon") {
			tdElem.classList.add(cssClassName);
			tdElem.classList.add(cssClassName2);
		} else {
			tdElem.classList.add(cssClassName);
		}
		Game.gridAvailableFields.splice(index,1);
	},
	
	// Setting players data into players info data divs
	setPlayersData: function() {
		// Player 1 Data
		player1NameElem.text(player1.name);
		player1PictureElem.html("<img src=\"img/player1.gif\">");
		player1HealthValueElem.text(player1.health);
		player1WeaponPictureElem.html("<img src=" + player1.weapon.pictureUrl + ">");
		player1WeaponNameElem.text(player1.weapon.name);
		player1WeaponDamageValueElem.text(player1.weapon.damage);
		// Player 2 Data
		player2NameElem.text(player2.name);
		player2PictureElem.html("<img src=\"img/player2.gif\">");
		player2HealthValueElem.text(player2.health);
		player2WeaponPictureElem.html("<img src=" + player2.weapon.pictureUrl + ">");
		player2WeaponNameElem.text(player2.weapon.name);
		player2WeaponDamageValueElem.text(player1.weapon.damage);
	},
	
	// Updating player data div when player collects new weapon
	updatePlayerWeaponData: function(activePlayer) {
		if (activePlayer === "player1") {
			player1WeaponPictureElem.html("<img src=" + player1.weapon.pictureUrl + ">");
			player1WeaponNameElem.text(player1.weapon.name);
			player1WeaponDamageValueElem.text(player1.weapon.damage);
		} else {
			player2WeaponPictureElem.html("<img src=" + player2.weapon.pictureUrl + ">");
			player2WeaponNameElem.text(player2.weapon.name);
			player2WeaponDamageValueElem.text(player2.weapon.damage);
		}
	},
	
	// Changing active player at the end of the turn
	changeActivePlayer: function() {
		if (activePlayer === "player1") {
			activePlayer = "player2";
			notActivePlayer = "player1";
		} else {
			activePlayer = "player1";
			notActivePlayer = "player2";
		}
	},
	
	// Giving player new weapon when he collects it
	changeWeapon: function() {
		playerCell = document.querySelector("td[class*=" + activePlayer + "]");
		var weaponType = playerCell.classList;
		switch (true) {
			// When he collects knife
			case weaponType.contains("knife"):
				if (activePlayer === "player1") {
					var playerActualWeapon = player1.weapon.name;
					player1.weapon = knife;
				} else {
					var playerActualWeapon = player2.weapon.name;
					player2.weapon = knife;
				}
				playerCell.classList.remove("knife");
				break;
			// When he collects sword
			case weaponType.contains("sword"):
				if (activePlayer === "player1") {
					var playerActualWeapon = player1.weapon.name;
					player1.weapon = sword;
				} else {
					var playerActualWeapon = player2.weapon.name;
					player2.weapon = sword;
				}
				playerCell.classList.remove("sword");
				break;
			// When he collects katana
			case weaponType.contains("katana"):
				if (activePlayer === "player1") {
					var playerActualWeapon = player1.weapon.name;
					player1.weapon = katana;
				} else {
					var playerActualWeapon = player2.weapon.name;
					player2.weapon = katana;
				}
				playerCell.classList.remove("katana");
				break;
			// When he collects axe
			case weaponType.contains("axe"):
				if (activePlayer === "player1") {
					var playerActualWeapon = player1.weapon.name;
					player1.weapon = axe;
				} else {
					var playerActualWeapon = player2.weapon.name;
					player2.weapon = axe;
				}
				playerCell.classList.remove("axe");
				break;
			// When he collects spear
			case weaponType.contains("spear"):
				if (activePlayer === "player1") {
					var playerActualWeapon = player1.weapon.name;
					player1.weapon = spear;
				} else {
					var playerActualWeapon = player2.weapon.name;
					player2.weapon = spear;
				}
				playerCell.classList.remove("spear");
				break;
		}
		playerCell.classList.add(playerActualWeapon);
		Game.updatePlayerWeaponData(activePlayer);
	},
	
	// Increasing player health value when he collects heart
	increaseHealth: function() {
		if (activePlayer === "player1") {
			player1HealthValueElem.text(player1.health += energyBoostValue);
		} else {
			player2HealthValueElem.text(player2.health += energyBoostValue);
		}
		playerCell.classList.remove("energy");
	},
	
	// Creating available movement fields array for active player
	createMovementFields: function() {
		playerCell = document.querySelector("td[class*=" + activePlayer + "]");
		playerX = Number(playerCell.getAttribute("x"));
 		playerY = Number(playerCell.getAttribute("y"));
		var i;
		Game.playerMovementFields = [];
		// Available movement fields on x right direction
		i = playerX + 1;
		var repeat = true;
		while (repeat) {
			if (i <= gridXFields && i <= playerX + maximumMoveFields) {
				checkedCell = document.querySelector("td[x='" + i + "'][y='" + playerY + "']");
				if (checkedCell.classList.contains("obstacle") || checkedCell.classList.contains(notActivePlayer)) {
					repeat = false;
				} else {
					var cellXY = [i,playerY];
					Game.playerMovementFields.push(cellXY);
					i += 1;
				}
			} else {
				repeat = false;
			}
		}
		// Available movement fields on x left direction
		i = playerX - 1;
		var repeat = true;
		while (repeat) {
			if (i >= 1 && i >= playerX - maximumMoveFields) {
				checkedCell = document.querySelector("td[x='" + i + "'][y='" + playerY + "']");
				if (checkedCell.classList.contains("obstacle") || checkedCell.classList.contains(notActivePlayer)) {
					repeat = false;
				} else {
					var cellXY = [i,playerY];
					Game.playerMovementFields.push(cellXY);
					i -= 1;
				}
			} else {
				repeat = false;
			}
		}
		// Available movement fields on y down direction
		i = playerY + 1;
		var repeat = true;
		while (repeat) {
			if (i <= gridYFields && i <= playerY + maximumMoveFields) {
				checkedCell = document.querySelector("td[x='" + playerX + "'][y='" + i + "']");
				if (checkedCell.classList.contains("obstacle") || checkedCell.classList.contains(notActivePlayer)) {
					repeat = false;
				} else {
					var cellXY = [playerX,i];
					Game.playerMovementFields.push(cellXY);
					i += 1;
				}
			} else {
				repeat = false;
			}
		}
		// Available movement fields on y up direction
		i = playerY - 1;
		var repeat = true;
		while (repeat) {
			if (i >= 1 && i >= playerY - maximumMoveFields) {
				checkedCell = document.querySelector("td[x='" + playerX + "'][y='" + i + "']");
				if (checkedCell.classList.contains("obstacle") || checkedCell.classList.contains(notActivePlayer)) {
					repeat = false;
				} else {
					var cellXY = [playerX,i];
					Game.playerMovementFields.push(cellXY);
					i -= 1;
				}
			} else {
				repeat = false;
			}
		}
	},
	
	// Showing available movement fields on a game board for active player
	showMovementFields: function() {
		Game.playerMovementFields.forEach(function(item) {
			var movementCell = document.querySelector("td[x='" + item[0] + "'][y='" + item[1] + "']");
			movementCell.classList.add("highlighted");
		});
	},
	
	// Hiding available movement fields on a game board when player choose destination cell
	hideMovementFields: function() {
		Game.playerMovementFields.forEach(function(item) {
			var movementCell = document.querySelector("td[x='" + item[0] + "'][y='" + item[1] + "']");
			movementCell.classList.remove("highlighted");
		});
	},
	
	// Starting game
	startGame: function () {
		Game.displayPlayerTurnMessage();
		Game.createMovementFields();
		Game.showMovementFields();
		var table = document.querySelector("table");
		table.addEventListener("mousedown", Game.movePlayers);
	},
	
	// Checking all adjacent cells on the player's movement way for presence of other player
	checkFightPosition: function() {
		fight = false;
		// Checking cell on player's right side (if it exists)
		if (playerX !== gridXFields) {
			checkedCell = document.querySelector("td[x='" + (playerX + 1) + "'][y='" + playerY + "']");
			if (checkedCell.classList.contains(notActivePlayer)) {
				fight = true;
			}
		}
		// Checking cell on player's left side (if it exists)
		if (playerX !== 1) {
			checkedCell = document.querySelector("td[x='" + (playerX - 1) + "'][y='" + playerY + "']");
			if (checkedCell.classList.contains(notActivePlayer)) {
				fight = true;
			}
		}
		// Checking cell under player (if it exists)
		if (playerY !== gridYFields) {
			checkedCell = document.querySelector("td[x='" + playerX + "'][y='" + (playerY + 1) + "']");
			if (checkedCell.classList.contains(notActivePlayer)) {
				fight = true;
			}
		}
		// Checking cell above player (if it exists)
		if (playerY !== 1) {
			checkedCell = document.querySelector("td[x='" + playerX + "'][y='" + (playerY - 1) + "']");
			if (checkedCell.classList.contains(notActivePlayer)) {
				fight = true;
			}
		}
	},
	
	// Movement of players (when player choose destination cell from cells available to move)
	movePlayers: function(event) {
		clickedCell = event.target;
		clickedX = Number(event.target.getAttribute("x"));
		clickedY = Number(event.target.getAttribute("y"));
		playerCell = document.querySelector("td[class*=" + activePlayer + "]");
		playerX = Number(playerCell.getAttribute("x"));
		playerY = Number(playerCell.getAttribute("y"));
		if (clickedCell.classList.contains("highlighted")) {
			Game.hideMovementFields();
			// Move player on x
			if (clickedY === playerY) {
				// Move player right
				if (clickedX > playerX) {
					while (playerX !== clickedX && fight !== true) {
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerX = Number(playerCell.getAttribute("x"));
						if (playerCell.classList.contains("flip-image")) {
							playerCell.classList.remove("flip-image");
						}
						playerCell.classList.remove(activePlayer);
						nextCell = document.querySelector("td[x='" + (playerX + 1) + "'][y='" + playerY + "']");
						nextCell.classList.add(activePlayer);
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerX = Number(playerCell.getAttribute("x"));						
						if (playerCell.classList.contains("weapon")) {
							Game.changeWeapon();
						}
						if (playerCell.classList.contains("energy")) {
							Game.increaseHealth();
						}
						Game.checkFightPosition();
					}
				} else {
					// Move player left
					while (playerX !== clickedX && fight !== true) {
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerX = Number(playerCell.getAttribute("x"));
						if (playerCell.classList.contains("flip-image")) {
							playerCell.classList.remove("flip-image");
						}
						playerCell.classList.remove(activePlayer);
						nextCell = document.querySelector("td[x='" + (playerX - 1) + "'][y='" + playerY + "']");
						nextCell.classList.add(activePlayer);
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerX = Number(playerCell.getAttribute("x"));
						if (playerCell.classList.contains("weapon")) {
							Game.changeWeapon();
						}
						if (playerCell.classList.contains("energy")) {
							Game.increaseHealth();
						}
						Game.checkFightPosition();
					}
				}
			}
			
			// Move player on y
			if (clickedX === playerX) {
				// Move player down
				if (playerY < clickedY) {
					while (playerY !== clickedY && fight !== true) {
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerY = Number(playerCell.getAttribute("y"));
						if (playerCell.classList.contains("flip-image")) {
							playerCell.classList.remove("flip-image");
						}
						playerCell.classList.remove(activePlayer);
						nextCell = document.querySelector("td[x='" + playerX + "'][y='" + (playerY + 1) + "']");
						nextCell.classList.add(activePlayer);
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerY = Number(playerCell.getAttribute("y"));
						if (playerCell.classList.contains("weapon")) {
							Game.changeWeapon();
						}
						if (playerCell.classList.contains("energy")) {
							Game.increaseHealth();
						}
						Game.checkFightPosition();
					}
				} else {
					// Move player up
					while (playerY !== clickedY && fight !== true) {
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerY = Number(playerCell.getAttribute("y"));
						if (playerCell.classList.contains("flip-image")) {
							playerCell.classList.remove("flip-image");
						}
						playerCell.classList.remove(activePlayer);
						nextCell = document.querySelector("td[x='" + playerX + "'][y='" + (playerY - 1) + "']");
						nextCell.classList.add(activePlayer);
						playerCell = document.querySelector("td[class*=" + activePlayer + "]");
						playerY = Number(playerCell.getAttribute("y"));
						if (playerCell.classList.contains("weapon")) {
							Game.changeWeapon();
						}
						if (playerCell.classList.contains("energy")) {
							Game.increaseHealth();
						}
						Game.checkFightPosition();
					}
				}
			}
			// Rotating player's pictures facing each other
			var player1Cell = document.querySelector(".player1");
			var player2Cell = document.querySelector(".player2");
			var player1X = Number(player1Cell.getAttribute("x"));
			var player2X = Number(player2Cell.getAttribute("x"));
			if (player1X > player2X) {
				player1Cell.classList.add("flip-image");
				player2Cell.classList.add("flip-image");
			} else {
				player1Cell.classList.remove("flip-image");
				player2Cell.classList.remove("flip-image");
			} 
			if (fight !== true) {
				// If active player has not met other player
				Game.changeActivePlayer();
				Game.createMovementFields();
				Game.showMovementFields();
				Game.displayPlayerTurnMessage();
			} else {
				// If active player has met other player
				var table = document.querySelector("table");
				table.removeEventListener("mousedown", Game.movePlayers);
				Game.showBattleMessage();
			}
		}
	},
	
	// Showing battle begins message
	showBattleMessage : function() {
		battleMessageWrapperElem.show();
		battleMessageHide = setTimeout(Game.hideBattleMessage, 2000);
	},
	
	// Hiding battle begins message and starting fight
	hideBattleMessage : function() {
		clearTimeout(battleMessageHide);
		battleMessageWrapperElem.hide();
		Game.startFight();
	},
	
	// Starting fight
	startFight: function() {
		if (activePlayer === "player1") {
			player1FightButtonsElem.show();
		} else {
			player2FightButtonsElem.show();
		}
		player1FightButtonsElem[0].addEventListener("click", Game.player1FightTurn);
		player2FightButtonsElem[0].addEventListener("click", Game.player2FightTurn);
	},
	
	// Displaying players turn message
	displayPlayerTurnMessage: function() {
		if (activePlayer === "player1") {
			player1TurnMessageElem.html("Player 1<br/>is your turn");
			player2TurnMessageElem.text("");
		} else {
			player1TurnMessageElem.text("");
			player2TurnMessageElem.html("Player 2<br/>is your turn");
		}
	},
	
	// Hiding fight (attack and defense) buttons
	hideFightButtons: function() {
		player1FightButtonsElem.hide();
		player2FightButtonsElem.hide();
	},
	
	// When player 1 click attack or defend button
	player1FightTurn: function(event) {
		if (event.target !== event.currentTarget) {
			if (event.target.classList.contains("button-attack")) {
				if (player2Defend) {
					damage = player1.weapon.damage / 2;
					player2Defend = false;
				} else {
					damage = player1.weapon.damage;
				}
				player1Defend = false;
				player2.health -= damage;
				player1FightMessageElem.text("You attacked and dealt " + damage + " points of damage");
				if (player2.health <= 0) {
					player2HealthValueElem[0].innerHTML = 0;
					player2FightMessageElem.text("You lost !!!");
					player1FightMessageElem.text("You won !!!");
					Game.gameOver();
					return;
				} else {
					player2HealthValueElem[0].innerHTML = player2.health;
					player2FightMessageElem.text("You have lost " + damage + " points of health");
				}
			} else {
				player1Defend = true;
				player1FightMessageElem.text("You are defending against next atack");
			}
			player1FightButtonsElem.hide();
			player2FightButtonsElem.show();
			if (player2Defend) {
				player2DefendButtonElem.hide();
			} else {
				player2DefendButtonElem.show();
			}
			Game.changeActivePlayer();
			Game.displayPlayerTurnMessage();
		}
	},
	
	// When player 2 click attack or defend button
	player2FightTurn: function(event) {
		if (event.target !== event.currentTarget) {
			if (event.target.classList.contains("button-attack")) {
				if (player1Defend) {
					damage = player2.weapon.damage / 2;
					player1Defend = false;
				} else {
					damage = player2.weapon.damage;
				}
				player2Defend = false;
				player1.health -= damage;
				player2FightMessageElem.text("You attacked and dealt " + damage + " points of damage");
				if (player1.health <= 0) {
					player1HealthValueElem[0].innerHTML = 0;
					player1FightMessageElem.text("You lost !!!");
					player2FightMessageElem.text("You won !!!");
					Game.gameOver();
					return;
				} else {
					player1HealthValueElem[0].innerHTML = player1.health;
					player1FightMessageElem.text("You have lost " + damage + " points of health");
				}
			} else {
				player2Defend = true;
				player2FightMessageElem.text("You are defending against next atack");
			}
			player2FightButtonsElem.hide();
			player1FightButtonsElem.show();
			if (player1Defend) {
				player1DefendButtonElem.hide();
			} else {
				player1DefendButtonElem.show();
			}
			Game.changeActivePlayer();
			Game.displayPlayerTurnMessage();
		}
	},
	
	// Displaying game over message and reseting variables to start next game
	gameOver: function() {
		player1FightButtonsElem[0].removeEventListener("click", Game.player1FightTurn);
		player2FightButtonsElem[0].removeEventListener("click", Game.player2FightTurn);
		Game.hideFightButtons();
		player1TurnMessageElem[0].innerHTML = "";
		player2TurnMessageElem[0].innerHTML = "";
		gameOverWrapperElem.show();
		if (activePlayer === "player1") {
			winnerNumberElem.text("Player 1");
			winnerNameElem.text(player1.name);
			winnerPictureElem.html("<img src=\"img/player1.gif\">");
		} else {
			winnerNumberElem.text("Player 2");
			winnerNameElem.text(player2.name);
			winnerPictureElem.html("<img src=\"img/player2.gif\">");
		}
		// When play again button is clicked
		playAgainButtonElem.on("click",function() {
			gameOverWrapperElem.hide();
			player1FightMessageElem.text("");
			player2FightMessageElem.text("");
			var boardWrapperElem = $("#board-wrapper");
			// Erasing board grid table
			boardWrapperElem.html("");
			fight = false;
			Game.gridAvailableFields = [];
			Game.playerMovementFields = [];
			Game.changeActivePlayer;
			Game.init();
		});
	}
}
