//Important vars:
//roomCollection(object array)
//itemCollection(object array)
//currentRoomId(int)
//inventoryItems(int array)

var Room = {
	id: -1,
	name: "unset",
	description: "I wasn't set!",
	exits: [],
	connectedRooms: [],
	containedItems: [],
	isDark: false,
	lockedExits: []
}

var roomCollection = [];

var Item = {
	id: -1,
	name: "unset",
	interactNames: [],
	verbs: [],
	takeable: false,
	inInventory: false,
	description: "I wasn't set!",
	takeText: "",
	openText: "",
	opened: false,
	combineable: false,
	containedItems: [],
	inContainer: false,
	revealed: true,
	onUse: [],
	diolauge: "none",
	combineID: -1,
	combineText: "",
	combineResult: []
}

var itemCollection = [];

var acceptedVerbs = ["help", "n", "north", "e", "east", "s", "south", "w", "west", "talk", "chat", "speak", "pick up", "take", "use", "open", "activate", "i", "inventory", "look", "examine", "hit", "shoot"];
var notAcceptedResponses = ["...What?", "I don't know what you mean by that.", "That's not something I'm letting you do, no.", "You might want to type in HELP, there, buddy.", "I was preprogrammed with acceptable actions, and that's definately not one of them.", "Are you drunk again?", "I'm not doing that.", "I don't even.", "Clever, but not something I know how to work with.", "I swear to god, I don't understand what you just typed in, but if it's something insulting, I'm gonna subscribe your cell phone number to Cat Facts.", "I don't understand that action.", "I don't understand.", "I don't get it.", "That's not an action that I understand.", "I don't know how to do that.", "Huh?", "Whatever that was, it's certainly not the answer to this problem.", "That's not an action I've been programmed to understand.", "Come again?", "You'll have to rephrase that one.", "Not understood, type in HELP to see the actions you can use.", "You're just trying to see all of these messages, aren't you?", "No.", "I'm not gonna do that.", "You can't make me do that!", "That's not happening.", "[NEGATIVE RESPONSE]", "I think there's a problem between the monitor and the chair, here.", "u wot m8?", "No entiendo, señor", "Qué?", "うん、参照してください？私はあなたがあまりにも理解していない言語で入力することができます.\n[Yeah, see? I can type in languages you don't understand too.]", "I don't get it.", "What was that?", "Oh boy, I'm gonna give you a lot of snark for whatever the heck you just said.", "Was that a Watto reference?", "I don't get it.", "I don't understand that.", "I don't understand that.", "I don't understand that." ,"I don't understand that." ,"I don't understand that.","I don't understand that.", "I don't understand that.", "I don't understand that."]

var currentRoomId = 0;
var inventoryItems = [];

//+++++++++++++
//ROOM + ITEM DECLARATIONS
//+++++++++++++

//Starting Room
var room1 = Object.create(Room);
room1.id = 0;
room1.name = "your office";
room1.description = "This is your office. It's about as drab and boring as you are. As much as you love taking in the same exact sight you've been seeing for the past 30 years of your life, it's probably best to move along.;This is your office. You're pretty sure, anyway, because it's pitch black in here. You should probably use that LIGHT SWITCH.";
room1.exits = ["n"];
room1.connectedRooms = ["n", 1];
room1.containedItems = [0, 1, 2, 3, 4];
room1.isDark = true;

roomCollection.push(room1);

var lightSwitch1 = Object.create(Item);
lightSwitch1.id = 0;
lightSwitch1.name = "a light switch";
lightSwitch1.interactNames = ["switch", "light switch"]
lightSwitch1.verbs = ["look", "examine", "activate","use"];
lightSwitch1.description = "An ordinary light switch. The lost civilization of New York City once used these primitive devices to signal to their lightbulb overlords that they wish to be able to see again.";
lightSwitch1.onUse = ["tgl", "isDark", "You turn on the light, casting an immediate white glow in the room.", "You turn off the light, and now you're sitting in darkness again. Good job."];

itemCollection.push(lightSwitch1);

var gun2 = Object.create(Item);
gun2.id = 1;
gun2.name = "a gun";
gun2.interactNames = ["gun", "a gun", "the gun"];
gun2.verbs = ["look", "examine", "shoot", "use"];
gun2.takeable = true;
gun2.inContainer = true;
gun2.revealed = false;
gun2.description = "This is your personal firearm. There's been plenty of puzzles about, and you, being of brilliant mind, purchased this in order to solve them by force. Ironically, force hasn't been the answer to any puzzle, so it's been a pretty big waste of money.";
gun2.takeText = "You pick up the gun and put it in your inventory. Your manliness stat has increased by 5."
gun2.onUse = ["txt", "You begin to have serious second thoughts about using this thing to solve any of your problems, really."]

itemCollection.push(gun2);

var door3 = Object.create(Item);
door3.id = 2;
door3.name = "an office front door";
door3.interactNames = ["door", "front door", "office front door"];
door3.verbs = ["look", "examine", "open"];
door3.description = "The front door of your office. The words on it read 'Blockhead - I do anything, give me work. Please.' You were hoping the desperate worker angle would bring in lots of customers, but so far all it's done is become on a meme on the trendiest social networking sites.";
door3.openText = "You open the door. You didn't go through it, but you sure did open it."

itemCollection.push(door3);

var coatRack4 = Object.create(Item);
coatRack4.id = 3;
coatRack4.name = "a coat rack";
coatRack4.interactNames = ["rack", "coat rack"];
coatRack4.verbs = ["look", "examine"];
coatRack4.description = "A coat rack. You don't own any coats. This coat rack's existence is about as redundant as your own."

itemCollection.push(coatRack4);

var desk5 = Object.create(Item);
desk5.id = 4;
desk5.name = "a white desk";
desk5.interactNames = ["desk", "white desk", "drawer"];
desk5.verbs = ["look", "examine", "open"];
desk5.description = "Your blank white desk, complete with one singular blank white drawer. If this world wasn't entirely black and white, you'd have some difficulty keeping this clean, but thankfully this abstract concept hasn't even crossed your mind.";
desk5.containedItems = [1];
desk5.openText = "You open your desk drawer, revealing some pointless trinkets that you're not even going to bother mentally describing to yourself. Oh, yes, also a gun.";

itemCollection.push(desk5);

//End Starting Room

//Hallway outside of office
var room2 = Object.create(Room);
room2.id = 1;
room2.name = "the building's hallway";
room2.description = "You're in the office building hallway. The front entrance is blocked off for the yearly zombie raid drill. It's just a drill, do not panic. There's a maintence door to the east, and your office is to the south.\n\nMost of the offices in this building are vacant, the few that are used are occupied by tenants that spend their entire day watching QaziTV, the only form of entertainment in this world.\n\nYou silently wonder if Qazi's nose is real.";
room2.exits = ["s", "e"];
room2.connectedRooms = ["s", 0, "e", 2];
room2.containedItems = [5, 6];

roomCollection.push(room2);

var tape6 = Object.create(Item);
tape6.id = 5;
tape6.name = "a roll of duct tape";
tape6.interactNames = ["tape", "duct tape", "roll of duct tape"];
tape6.verbs = ["look", "examine", "use"];
tape6.takeable = true;
tape6.description = "A partially used roll of duct tape. This tape is said to fix all phyiscal problems, but sadly, doesn't fix any of the mental ones.";
tape6.takeText = "You take the duct tape. Your affinity for taking objects that probably don't belong to you has increased by one."
tape6.onUse = ["txt", "You don't really have that much duct tape to be using all willy-nilly like that."];

itemCollection.push(tape6);

var sign7 = Object.create(Item);
sign7.id = 6;
sign7.name = "a small sign";
sign7.interactNames = ["sign", "small sign"];
sign7.verbs = ["look", "examine"];
sign7.description = "A piece of paper has been stapled to the wall next to one of the offices. It reads:\n\n'ATTN: Everyone\nRemember that QaziTV broadcasts mon/wed/fri at 2pm EST. Expect delays. Constantly.\nQaziTV is committed to high quality broadcasts, please use the remainder of this sheet to note when mistakes occured during broadcast so we can better improve our show!'\n\nThe rest of the paper is filled to the brim with dates and time codes. There's so many that people had to start writing on the wall around the paper.";

itemCollection.push(sign7);

//End hallway outside of office

//Maintence room
var room3 = Object.create(Room);
room3.id = 2;
room3.name = "a musky maintenance office";
room3.description = "You enter a rough-smelling maintenance office. Black water drips down the sides of the walls. This place looks like it hasn't been cleaned in years.";
room3.exits = ["w", "n"];
room3.connectedRooms = ["w", 1, "n", 3];
room3.lockedExits = ["n"];
room3.containedItems = [7];

roomCollection.push(room3);

var door8 = Object.create(Item);
door8.id = 7;
door8.name = "a strange-looking door";
door8.interactNames = ["door", "strange door", "strange-looking door"];
door8.verbs = ["look", "examine", "on"];
door8.description = "You take a closer look at the door, and you notice that it's completely covered in what appear to be complicated locking mechanisms. There's a strange gun-shaped slot in the middle of it.";
door8.combineID = 1;
door8.combineText = "You insert the gun into the gun-shaped hole. What a suprise, it fits! The door's mechanisms turn and grind, and the door opens. You take your gun back as the door bolts itself in it's new location."
door8.combineResult = ["unlk", "n"];

itemCollection.push(door8);

//End maintence room



