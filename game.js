import * as THREE from "./node_modules/three/build/three.module.js";

const ACCOUNT_KEY = "after-space-account";
const SETTINGS_KEY = "after-space-settings";
const LANGUAGE_KEY = "after-space-language";
const WORLD_KEY_PREFIX = "after-space-world";

const WORLD_RADIUS = 28;
const SEA_LEVEL = 2;
const PLAYER_HEIGHT = 1.75;
const WALK_SPEED = 6.2;
const SPRINT_SPEED = 9.2;
const JUMP_FORCE = 8.4;
const GRAVITY = 24;
const REACH_DISTANCE = 7;
const MINE_DURATION = 1;
const DAY_LENGTH = 220;
const MAX_HEALTH = 200;
const SAVE_INTERVAL = 6;

const dom = {
  canvas: document.querySelector("#game-canvas"),
  menuScreen: document.querySelector("#menu-screen"),
  registerPanel: document.querySelector("#register-panel"),
  accountPanel: document.querySelector("#account-panel"),
  settingsPanel: document.querySelector("#settings-panel"),
  registerForm: document.querySelector("#register-form"),
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  accountName: document.querySelector("#account-name"),
  playButton: document.querySelector("#play-button"),
  settingsButton: document.querySelector("#settings-button"),
  closeSettings: document.querySelector("#close-settings"),
  logoutButton: document.querySelector("#logout-button"),
  worldButtons: [...document.querySelectorAll(".world-btn")],
  musicEnabled: document.querySelector("#music-enabled"),
  musicVolume: document.querySelector("#music-volume"),
  thirdPersonToggle: document.querySelector("#third-person-toggle"),
  menuMessage: document.querySelector("#menu-message"),
  hud: document.querySelector("#hud"),
  playerName: document.querySelector("#player-name"),
  worldName: document.querySelector("#world-name"),
  timeLabel: document.querySelector("#time-label"),
  statusLabel: document.querySelector("#status-label"),
  healthFill: document.querySelector("#health-fill"),
  energyFill: document.querySelector("#energy-fill"),
  threatFill: document.querySelector("#threat-fill"),
  reticle: document.querySelector("#reticle"),
  buildBar: document.querySelector("#build-bar"),
  buildMenuGrid: document.querySelector("#build-menu-grid"),
  swordButton: document.querySelector("#sword-button"),
  itemsButton: document.querySelector("#items-button"),
  allItemsPanel: document.querySelector("#all-items-panel"),
  allItemsGrid: document.querySelector("#all-items-grid"),
  closeItems: document.querySelector("#close-items")
};

const text = {
  zh: {
    welcome: "歡迎來到 AFTER SPACE",
    subtitle: "超大型方塊世界、白天黑夜、生存建造與怪物戰鬥，現在全部整合在一起。",
    feature1: "超大地圖",
    feature1b: "世界比之前大很多，而且保留明顯的方塊外觀。",
    feature2: "建造欄",
    feature2b: "底部建造欄改成 Roblox 風格的可建造物品列。",
    feature3: "帳號記住",
    feature3b: "除非按註銷帳號，否則關閉後再次打開也不會登出。",
    register: "建立帳號",
    gate: "註冊艙門",
    username: "使用者名稱",
    password: "密碼",
    remember: "註冊並記住帳號",
    signedIn: "已登入帳號",
    enter: "進入世界",
    settings: "設定",
    logout: "註銷帳號",
    settingsTitle: "控制中心",
    music: "背景音樂",
    volume: "音量",
    thirdPerson: "預設第三人稱",
    caps: "按下 Caps Lock 可以切換繁體中文與英文。",
    player: "玩家",
    world: "世界",
    time: "時間",
    status: "狀態",
    controls: ["方向鍵移動", "Space 跳躍", "Shift 衝刺", "左鍵 攻擊或挖掘", "右鍵 放置方塊", "V 切換第一 / 第三人稱", "I 開啟物品箱"],
    health: "生命",
    energy: "體力",
    threat: "威脅",
    items: "物品箱",
    allItems: "所有物品",
    sword: "劍",
    calm: "平靜",
    alert: "警戒中",
    ready: "準備完成",
    mining: "挖掘中",
    noBlocks: "沒有可放置的方塊",
    registered: "帳號已記住，之後不會自動登出。",
    deleted: "帳號已註銷。",
    invalid: "帳號至少 3 字，密碼至少 4 字。",
    respawn: "掉出地圖外，已重生",
    world1: "世界一號",
    world2: "世界二號",
    world3: "世界三號",
    bag: "背包",
    activeSword: "劍已裝備",
    activeBuild: "建造模式",
    day: "第"
  },
  en: {
    welcome: "Welcome To AFTER SPACE",
    subtitle: "Huge voxel worlds, day and night, survival building, and monster combat are all combined.",
    feature1: "Huge Map",
    feature1b: "The world is much larger now and keeps a strong blocky look.",
    feature2: "Build Bar",
    feature2b: "The bottom build bar now follows a Roblox-style build layout.",
    feature3: "Remembered Account",
    feature3b: "The game keeps your account until you explicitly delete it.",
    register: "Create Account",
    gate: "Registration Gate",
    username: "Username",
    password: "Password",
    remember: "Register And Remember Account",
    signedIn: "Signed In",
    enter: "Enter World",
    settings: "Settings",
    logout: "Delete Account",
    settingsTitle: "Control Center",
    music: "Background Music",
    volume: "Volume",
    thirdPerson: "Default Third Person",
    caps: "Press Caps Lock to switch between Traditional Chinese and English.",
    player: "Player",
    world: "World",
    time: "Time",
    status: "Status",
    controls: ["Arrow Keys Move", "Space Jump", "Shift Sprint", "Left Click Attack Or Mine", "Right Click Place Block", "V Toggle First / Third Person", "I Open Item Box"],
    health: "Health",
    energy: "Stamina",
    threat: "Threat",
    items: "Item Box",
    allItems: "All Items",
    sword: "Sword",
    calm: "Calm",
    alert: "Alert",
    ready: "Ready",
    mining: "Mining",
    noBlocks: "No blocks to place",
    registered: "Account remembered and will not auto logout.",
    deleted: "Account deleted.",
    invalid: "Username must be 3+, password 4+.",
    respawn: "You fell out of the world and respawned",
    world1: "World One",
    world2: "World Two",
    world3: "World Three",
    bag: "Bag",
    activeSword: "Sword equipped",
    activeBuild: "Build mode",
    day: "Day"
  }
};

const buildItems = [
  { id: "grass", zh: "草方塊", en: "Grass", color: 0x72b957 },
  { id: "dirt", zh: "泥土", en: "Dirt", color: 0x7f5b36 },
  { id: "stone", zh: "石頭", en: "Stone", color: 0x9097a3 },
  { id: "sand", zh: "沙塊", en: "Sand", color: 0xd6be7e },
  { id: "wood", zh: "木材", en: "Wood", color: 0x94653a },
  { id: "leaves", zh: "樹葉", en: "Leaves", color: 0x46a04a },
  { id: "crystal", zh: "晶體", en: "Crystal", color: 0x74e4ff, emissive: 0x183c4b },
  { id: "basalt", zh: "玄武岩", en: "Basalt", color: 0x38414d },
  { id: "brick", zh: "磚塊", en: "Brick", color: 0xa65748 },
  { id: "glass", zh: "玻璃", en: "Glass", color: 0xa8d8ff, emissive: 0x0b1824 },
  { id: "neon", zh: "霓光塊", en: "Neon", color: 0x69f6ff, emissive: 0x1c5e69 },
  { id: "metal", zh: "金屬板", en: "Metal", color: 0xa8b0bd },
  { id: "ice", zh: "冰塊", en: "Ice", color: 0xdff7ff },
  { id: "obsidian", zh: "黑曜石", en: "Obsidian", color: 0x2e2348 }
];

const drops = {
  slime: { zh: "史萊姆膠", en: "Slime Gel" },
  shade: { zh: "暗影碎片", en: "Shadow Shard" },
  mite: { zh: "晶塵", en: "Crystal Dust" }
};

const monsterDefs = [
  { id: "slime", zh: "史萊姆", en: "Slime", color: 0x7cff97, hp: 3, speed: 1.7, damage: 9 },
  { id: "shade", zh: "暗影體", en: "Shade", color: 0xa06fff, hp: 4, speed: 2.1, damage: 12 },
  { id: "mite", zh: "晶刺蟲", en: "Shard Mite", color: 0x7be8ff, hp: 3, speed: 2.6, damage: 10 }
];

const state = {
  lang: localStorage.getItem(LANGUAGE_KEY) || "zh",
  account: null,
  playing: false,
  worldId: "world-1",
  selectedBuild: 0,
  swordEquipped: false,
  thirdPerson: true,
  yaw: 0,
  pitch: -0.28,
  onGround: false,
  health: MAX_HEALTH,
  energy: 100,
  time: 0.25,
  day: 1,
  miningKey: null,
  miningProgress: 0,
  leftMouseDown: false,
  saveTimer: 0,
  monsterTimer: 0
};

const player = {
  position: new THREE.Vector3(0, 12, 0),
  velocity: new THREE.Vector3(),
  inventory: {},
  chest: {}
};

const settings = {
  musicEnabled: true,
  volume: 0.35,
  thirdPersonDefault: true
};

const keys = new Set();
const blocks = new Map();
const blockMeshes = [];
const baseBlocks = new Map();
const changedBlocks = new Map();
const monsters = [];

const renderer = new THREE.WebGLRenderer({ canvas: dom.canvas, antialias: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x97cdfd);
scene.fog = new THREE.Fog(0x97cdfd, 18, 170);

const camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 260);
const worldRoot = new THREE.Group();
const monsterRoot = new THREE.Group();
scene.add(worldRoot, monsterRoot);

const hemi = new THREE.HemisphereLight(0xcce6ff, 0x233447, 1.05);
const sun = new THREE.DirectionalLight(0xffefcb, 1.35);
const moon = new THREE.PointLight(0x7fcaff, 5, 220, 2);
scene.add(hemi, sun, moon);

const water = new THREE.Mesh(
  new THREE.PlaneGeometry(600, 600),
  new THREE.MeshStandardMaterial({ color: 0x2d71a7, transparent: true, opacity: 0.52 })
);
water.rotation.x = -Math.PI / 2;
water.position.y = SEA_LEVEL - 0.05;
scene.add(water);

const stars = new THREE.Points(
  (() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = 50 + Math.random() * 140;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  })(),
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.75, transparent: true, opacity: 0.25 })
);
scene.add(stars);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
const monsterGeometry = new THREE.BoxGeometry(1, 1, 1);
const blockMaterials = new Map(
  buildItems.map((item) => [
    item.id,
    new THREE.MeshStandardMaterial({
      color: item.color,
      emissive: item.emissive || 0x000000,
      roughness: 0.92,
      metalness: item.emissive ? 0.15 : 0.04
    })
  ])
);
const monsterMaterials = new Map(
  monsterDefs.map((monster) => [
    monster.id,
    new THREE.MeshStandardMaterial({ color: monster.color, emissive: 0x201530, roughness: 0.72 })
  ])
);

let audioContext = null;
let musicNodes = null;

function locale() {
  return text[state.lang];
}

function itemName(id) {
  const block = buildItems.find((item) => item.id === id);
  if (block) return block[state.lang];
  return drops[id]?.[state.lang] || id;
}

function worldStorageKey() {
  return `${WORLD_KEY_PREFIX}:${state.account.username}:${state.worldId}`;
}

function blockKey(x, y, z) {
  return `${x},${y},${z}`;
}

function getBlock(x, y, z) {
  return blocks.get(blockKey(x, y, z));
}

function applyLanguage() {
  const lang = locale();
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  document.querySelector("#main-title").textContent = lang.welcome;
  document.querySelector("#main-subtitle").textContent = lang.subtitle;
  document.querySelector("#feature-1-title").textContent = lang.feature1;
  document.querySelector("#feature-1-body").textContent = lang.feature1b;
  document.querySelector("#feature-2-title").textContent = lang.feature2;
  document.querySelector("#feature-2-body").textContent = lang.feature2b;
  document.querySelector("#feature-3-title").textContent = lang.feature3;
  document.querySelector("#feature-3-body").textContent = lang.feature3b;
  document.querySelector("#register-label").textContent = lang.register;
  document.querySelector("#register-title").textContent = lang.gate;
  document.querySelector("#username-label").textContent = lang.username;
  document.querySelector("#password-label").textContent = lang.password;
  document.querySelector("#register-button").textContent = lang.remember;
  document.querySelector("#signed-in-label").textContent = lang.signedIn;
  document.querySelector("#play-button").textContent = lang.enter;
  document.querySelector("#settings-button").textContent = lang.settings;
  document.querySelector("#logout-button").textContent = lang.logout;
  document.querySelector("#settings-label").textContent = lang.settings;
  document.querySelector("#settings-title").textContent = lang.settingsTitle;
  document.querySelector("#music-label").textContent = lang.music;
  document.querySelector("#volume-label").textContent = lang.volume;
  document.querySelector("#camera-label").textContent = lang.thirdPerson;
  document.querySelector("#caps-note").textContent = lang.caps;
  document.querySelector("#player-label").textContent = lang.player;
  document.querySelector("#world-label").textContent = lang.world;
  document.querySelector("#time-label-text").textContent = lang.time;
  document.querySelector("#status-label-text").textContent = lang.status;
  document.querySelector("#health-text").textContent = lang.health;
  document.querySelector("#energy-text").textContent = lang.energy;
  document.querySelector("#threat-text").textContent = lang.threat;
  document.querySelector("#build-menu-label").textContent = lang.items;
  document.querySelector("#build-menu-title").textContent = lang.feature2;
  document.querySelector("#all-items-label").textContent = lang.items;
  document.querySelector("#all-items-title").textContent = lang.allItems;
  dom.swordButton.textContent = lang.sword;
  dom.itemsButton.textContent = lang.items;
  const controls = document.querySelectorAll(".controls p");
  lang.controls.forEach((value, index) => {
    controls[index].textContent = value;
  });
  dom.worldButtons[0].textContent = lang.world1;
  dom.worldButtons[1].textContent = lang.world2;
  dom.worldButtons[2].textContent = lang.world3;
  refreshBuildBar();
  refreshBuildMenu();
  refreshAllItemsPanel();
  updateHud();
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;
  try {
    Object.assign(settings, JSON.parse(raw));
  } catch {}
  dom.musicEnabled.checked = settings.musicEnabled;
  dom.musicVolume.value = String(Math.round(settings.volume * 100));
  dom.thirdPersonToggle.checked = settings.thirdPersonDefault;
  state.thirdPerson = settings.thirdPersonDefault;
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function setMessage(message) {
  dom.menuMessage.textContent = message;
}

function setAccountUI() {
  if (state.account) {
    dom.registerPanel.classList.add("hidden");
    dom.accountPanel.classList.remove("hidden");
    dom.accountName.textContent = state.account.username;
    dom.playerName.textContent = state.account.username;
  } else {
    dom.registerPanel.classList.remove("hidden");
    dom.accountPanel.classList.add("hidden");
  }
}

function loadAccount() {
  const raw = localStorage.getItem(ACCOUNT_KEY);
  if (!raw) return;
  try {
    state.account = JSON.parse(raw);
  } catch {
    localStorage.removeItem(ACCOUNT_KEY);
  }
}

function saveAccount(username, password) {
  state.account = { username, password };
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(state.account));
  setAccountUI();
  setMessage(locale().registered);
}

function deleteAccount() {
  localStorage.removeItem(ACCOUNT_KEY);
  state.account = null;
  setAccountUI();
  setMessage(locale().deleted);
}

function ensureInventory() {
  buildItems.forEach((item) => {
    if (!(item.id in player.inventory)) player.inventory[item.id] = 80;
  });
  Object.keys(drops).forEach((id) => {
    if (!(id in player.inventory)) player.inventory[id] = 0;
  });
}

function resetPlayerData() {
  player.inventory = {};
  player.chest = {};
  ensureInventory();
  Object.keys(player.inventory).forEach((key) => {
    player.chest[key] = player.inventory[key];
  });
  state.health = MAX_HEALTH;
  state.energy = 100;
  state.time = 0.25;
  state.day = 1;
}

function heightAt(x, z) {
  return Math.round((8 + Math.sin(x * 0.14) * 2.4 + Math.cos(z * 0.13) * 2.2 + Math.sin((x + z) * 0.05) * 2.8) / 2) * 2;
}

function biomeAt(x, z) {
  const noise = Math.sin(x * 0.09) + Math.cos(z * 0.08) + Math.sin((x - z) * 0.05);
  if (noise < -1.1) return "sand";
  if (noise > 1.1) return "snow";
  if (noise > 0.32) return "crystal";
  return "grass";
}

function resetWorld() {
  [...blocks.values()].forEach((mesh) => worldRoot.remove(mesh));
  blocks.clear();
  baseBlocks.clear();
  changedBlocks.clear();
  blockMeshes.length = 0;
  monsters.splice(0).forEach((monster) => monsterRoot.remove(monster.mesh));
}

function addBlock(x, y, z, id, options = {}) {
  if (getBlock(x, y, z)) return false;
  const mesh = new THREE.Mesh(blockGeometry, blockMaterials.get(id));
  mesh.position.set(x, y, z);
  mesh.userData = { x, y, z, id };
  worldRoot.add(mesh);
  blocks.set(blockKey(x, y, z), mesh);
  blockMeshes.push(mesh);
  if (options.base) baseBlocks.set(blockKey(x, y, z), id);
  if (options.change) {
    const key = blockKey(x, y, z);
    if (baseBlocks.get(key) === id) changedBlocks.delete(key);
    else changedBlocks.set(key, id);
  }
  return true;
}

function removeBlock(x, y, z, options = {}) {
  const key = blockKey(x, y, z);
  const mesh = blocks.get(key);
  if (!mesh) return false;
  worldRoot.remove(mesh);
  blocks.delete(key);
  const index = blockMeshes.indexOf(mesh);
  if (index >= 0) blockMeshes.splice(index, 1);
  if (options.change) {
    if (baseBlocks.has(key)) changedBlocks.set(key, null);
    else changedBlocks.delete(key);
  }
  return true;
}

function buildWorld() {
  resetWorld();
  for (let x = -WORLD_RADIUS; x <= WORLD_RADIUS; x += 1) {
    for (let z = -WORLD_RADIUS; z <= WORLD_RADIUS; z += 1) {
      const biome = biomeAt(x, z);
      const topY = heightAt(x, z);
      const topBlock = biome === "sand" ? "sand" : biome === "snow" ? "snow" : biome === "crystal" ? "basalt" : "grass";
      const lowerBlock = biome === "sand" ? "sand" : biome === "crystal" ? "basalt" : "dirt";
      addBlock(x, topY, z, topBlock, { base: true });
      addBlock(x, topY - 1, z, lowerBlock, { base: true });
      addBlock(x, topY - 2, z, biome === "crystal" ? "basalt" : "stone", { base: true });
      const seed = Math.sin(x * 9.1 + z * 5.3);
      if (biome === "grass" && seed > 0.992) {
        addBlock(x, topY + 1, z, "wood", { base: true });
        addBlock(x, topY + 2, z, "wood", { base: true });
        addBlock(x, topY + 3, z, "wood", { base: true });
        for (let dx = -1; dx <= 1; dx += 1) {
          for (let dz = -1; dz <= 1; dz += 1) {
            addBlock(x + dx, topY + 4, z + dz, "leaves", { base: true });
          }
        }
      }
      if (biome === "crystal" && seed > 0.993) {
        addBlock(x, topY + 1, z, "crystal", { base: true });
        addBlock(x, topY + 2, z, "crystal", { base: true });
      }
    }
  }
}

function groundHeight(x, z) {
  const rx = Math.round(x);
  const rz = Math.round(z);
  for (let y = 20; y >= -4; y -= 1) {
    if (getBlock(rx, y, rz)) return y + 0.5;
  }
  return SEA_LEVEL;
}

function spawnPlayer() {
  player.position.set(0, groundHeight(0, 0) + PLAYER_HEIGHT, 0);
  player.velocity.set(0, 0, 0);
}

function saveWorld(reason = "") {
  if (!state.account) return;
  const payload = {
    player: { x: player.position.x, y: player.position.y, z: player.position.z },
    inventory: player.inventory,
    chest: player.chest,
    health: state.health,
    energy: state.energy,
    time: state.time,
    day: state.day,
    changes: [...changedBlocks.entries()]
  };
  localStorage.setItem(worldStorageKey(), JSON.stringify(payload));
  if (reason) dom.reticle.textContent = reason;
}

function loadWorld() {
  buildWorld();
  resetPlayerData();
  spawnPlayer();
  const raw = localStorage.getItem(worldStorageKey());
  if (!raw) return;
  try {
    const save = JSON.parse(raw);
    player.inventory = save.inventory || player.inventory;
    player.chest = save.chest || player.chest;
    state.health = save.health ?? MAX_HEALTH;
    state.energy = save.energy ?? 100;
    state.time = save.time ?? 0.25;
    state.day = save.day ?? 1;
    if (save.player) player.position.set(save.player.x, save.player.y, save.player.z);
    if (Array.isArray(save.changes)) {
      save.changes.forEach(([key, value]) => {
        const [x, y, z] = key.split(",").map(Number);
        if (value === null) removeBlock(x, y, z);
        else {
          if (getBlock(x, y, z)) removeBlock(x, y, z);
          addBlock(x, y, z, value);
        }
        changedBlocks.set(key, value);
      });
    }
  } catch {}
}

function startAudio() {
  if (!settings.musicEnabled) return;
  if (!audioContext) audioContext = new AudioContext();
  if (musicNodes) return;
  const gain = audioContext.createGain();
  gain.gain.value = settings.volume * 0.018;
  gain.connect(audioContext.destination);
  const padA = audioContext.createOscillator();
  const padB = audioContext.createOscillator();
  const padC = audioContext.createOscillator();
  padA.type = "sine";
  padB.type = "sine";
  padC.type = "sine";
  padA.frequency.value = 196;
  padB.frequency.value = 246.94;
  padC.frequency.value = 293.66;
  padA.connect(gain);
  padB.connect(gain);
  padC.connect(gain);
  padA.start();
  padB.start();
  padC.start();
  musicNodes = { gain, padA, padB, padC };
}

function updateAudio() {
  if (!settings.musicEnabled && musicNodes) {
    musicNodes.padA.stop();
    musicNodes.padB.stop();
    musicNodes.padC.stop();
    musicNodes = null;
    return;
  }
  if (settings.musicEnabled) {
    startAudio();
    if (musicNodes) musicNodes.gain.gain.value = settings.volume * 0.018;
  }
}

function playDamageSound() {
  if (!audioContext) audioContext = new AudioContext();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(220, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.12);
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08 * settings.volume, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.14);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.16);
}

function refreshBuildBar() {
  dom.buildBar.innerHTML = "";
  buildItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `build-slot${index === state.selectedBuild ? " active" : ""}`;
    button.innerHTML = `<strong>${item[state.lang]}</strong><span>${locale().bag}: ${player.inventory[item.id] || 0}</span><em>${index + 1}</em>`;
    button.addEventListener("click", () => {
      state.selectedBuild = index;
      state.swordEquipped = false;
      refreshBuildBar();
      refreshBuildMenu();
      refreshActionButtons();
    });
    dom.buildBar.append(button);
  });
}

function refreshBuildMenu() {
  dom.buildMenuGrid.innerHTML = "";
  buildItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `item-card${index === state.selectedBuild ? " active" : ""}`;
    button.innerHTML = `<strong>${item[state.lang]}</strong><span>${locale().bag}: ${player.inventory[item.id] || 0}</span>`;
    button.addEventListener("click", () => {
      state.selectedBuild = index;
      state.swordEquipped = false;
      refreshBuildBar();
      refreshBuildMenu();
      refreshActionButtons();
      dom.reticle.textContent = item[state.lang];
    });
    dom.buildMenuGrid.append(button);
  });
}

function refreshBuildMenu() {
  dom.buildMenuGrid.innerHTML = "";
  buildItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `item-card${index === state.selectedBuild ? " active" : ""}`;
    button.innerHTML = `<strong>${item[state.lang]}</strong><span>${locale().bag}: ${player.inventory[item.id] || 0}</span>`;
    button.addEventListener("click", () => {
      state.selectedBuild = index;
      state.swordEquipped = false;
      refreshBuildBar();
      refreshBuildMenu();
      refreshActionButtons();
      dom.reticle.textContent = item[state.lang];
    });
    dom.buildMenuGrid.append(button);
  });
}

function refreshActionButtons() {
  dom.swordButton.classList.toggle("active", state.swordEquipped);
  dom.itemsButton.classList.toggle("active", !dom.allItemsPanel.classList.contains("hidden"));
}

function refreshAllItemsPanel() {
  dom.allItemsGrid.innerHTML = "";
  [...buildItems.map((item) => item.id), ...Object.keys(drops)].forEach((id) => {
    const cell = document.createElement("article");
    cell.className = "item-card";
    cell.innerHTML = `<strong>${itemName(id)}</strong><span>${locale().bag}: ${player.inventory[id] || 0}</span>`;
    dom.allItemsGrid.append(cell);
  });
}

function updateHud() {
  dom.playerName.textContent = state.account?.username || "Explorer";
  dom.worldName.textContent = locale()[state.worldId.replace("-", "")];
  const totalMinutes = Math.floor(state.time * 24 * 60);
  const hh = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
  const mm = String(totalMinutes % 60).padStart(2, "0");
  dom.timeLabel.textContent = state.lang === "zh" ? `${locale().day} ${state.day} 天 ${hh}:${mm}` : `${locale().day} ${state.day} ${hh}:${mm}`;
  dom.statusLabel.textContent = monsters.length > 0 ? locale().alert : locale().calm;
  dom.healthFill.style.width = `${(state.health / MAX_HEALTH) * 100}%`;
  dom.energyFill.style.width = `${state.energy}%`;
  dom.threatFill.style.width = `${Math.min(100, monsters.length * 14 + nightFactor() * 70)}%`;
}

function updateSky() {
  const angle = state.time * Math.PI * 2;
  const dayLight = THREE.MathUtils.clamp(Math.sin(angle) * 0.72 + 0.38, 0.08, 1);
  const night = 1 - dayLight;
  const dayColor = new THREE.Color(0x97cdfd);
  const nightColor = new THREE.Color(0x20385d);
  scene.background.copy(nightColor.clone().lerp(dayColor, dayLight));
  scene.fog.color.copy(scene.background);
  stars.material.opacity = 0.12 + night * 0.8;
  hemi.intensity = 0.3 + dayLight * 1.05;
  sun.intensity = 0.12 + dayLight * 1.45;
  sun.position.set(Math.cos(angle) * 40, Math.max(6, Math.sin(angle) * 36), Math.sin(angle) * 30);
  moon.position.set(-sun.position.x * 0.7, 18 + night * 14, -sun.position.z);
  moon.intensity = 5 + night * 13;
}

function nightFactor() {
  return THREE.MathUtils.clamp((Math.cos(state.time * Math.PI * 2) + 0.2) * 0.76, 0, 1);
}

function targetedBlock() {
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const hits = raycaster.intersectObjects(blockMeshes, false);
  return hits.find((hit) => hit.distance <= REACH_DISTANCE) || null;
}

function targetedMonster() {
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const hits = raycaster.intersectObjects(monsters.map((monster) => monster.mesh), false);
  if (!hits.length || hits[0].distance > REACH_DISTANCE) return null;
  return monsters.find((monster) => monster.mesh === hits[0].object) || null;
}

function spawnMonster() {
  if (monsters.length >= 8 || nightFactor() < 0.45) return;
  const def = monsterDefs[Math.floor(Math.random() * monsterDefs.length)];
  const angle = Math.random() * Math.PI * 2;
  const distance = 14 + Math.random() * 14;
  const x = player.position.x + Math.cos(angle) * distance;
  const z = player.position.z + Math.sin(angle) * distance;
  const mesh = new THREE.Mesh(monsterGeometry, monsterMaterials.get(def.id));
  mesh.position.set(x, groundHeight(x, z) + 0.8, z);
  monsterRoot.add(mesh);
  monsters.push({ def, mesh, hp: def.hp, cooldown: 0, bob: Math.random() * Math.PI * 2 });
}

function updateMonsters(delta) {
  state.monsterTimer -= delta;
  if (state.monsterTimer <= 0) {
    spawnMonster();
    state.monsterTimer = 3.8;
  }
  monsters.forEach((monster) => {
    monster.cooldown = Math.max(0, monster.cooldown - delta);
    monster.bob += delta * 4;
    const toPlayer = player.position.clone().sub(monster.mesh.position);
    const flat = new THREE.Vector3(toPlayer.x, 0, toPlayer.z);
    const dist = flat.length();
    if (dist > 0.2) {
      flat.normalize();
      monster.mesh.position.addScaledVector(flat, monster.def.speed * delta);
    }
    monster.mesh.position.y = groundHeight(monster.mesh.position.x, monster.mesh.position.z) + 0.75 + Math.sin(monster.bob) * 0.08;
    if (dist < 1.7 && monster.cooldown === 0) {
      state.health = Math.max(0, state.health - monster.def.damage);
      monster.cooldown = 1.15;
      playDamageSound();
    }
  });
  for (let i = monsters.length - 1; i >= 0; i -= 1) {
    if (monsters[i].hp <= 0 || monsters[i].mesh.position.distanceTo(player.position) > 70) {
      player.inventory[monsters[i].def.id] = (player.inventory[monsters[i].def.id] || 0) + 1;
      monsterRoot.remove(monsters[i].mesh);
      monsters.splice(i, 1);
      refreshAllItemsPanel();
    }
  }
}

function movePlayer(delta) {
  const input = new THREE.Vector3();
  if (keys.has("ArrowUp")) input.z -= 1;
  if (keys.has("ArrowDown")) input.z += 1;
  if (keys.has("ArrowLeft")) input.x -= 1;
  if (keys.has("ArrowRight")) input.x += 1;

  let speed = WALK_SPEED;
  if (keys.has("ShiftLeft") || keys.has("ShiftRight")) {
    speed = SPRINT_SPEED;
    state.energy = Math.max(0, state.energy - delta * 8);
  } else {
    state.energy = Math.min(100, state.energy + delta * 4);
  }

  if (input.lengthSq() > 0) {
    input.normalize();
    const forward = new THREE.Vector3(Math.sin(state.yaw), 0, Math.cos(state.yaw));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    const movement = new THREE.Vector3();
    movement.addScaledVector(forward, -input.z);
    movement.addScaledVector(right, input.x);
    movement.normalize().multiplyScalar(speed * delta);
    player.position.add(movement);
  }

  player.velocity.y -= GRAVITY * delta;
  player.position.y += player.velocity.y * delta;
  const floor = groundHeight(player.position.x, player.position.z) + PLAYER_HEIGHT;
  if (player.position.y <= floor) {
    player.position.y = floor;
    player.velocity.y = 0;
    state.onGround = true;
  } else {
    state.onGround = false;
  }

  if (player.position.y < -40) {
    spawnPlayer();
    dom.reticle.textContent = locale().respawn;
  }
}

function updateCamera() {
  camera.rotation.order = "YXZ";
  camera.rotation.y = state.yaw;
  camera.rotation.x = state.pitch;
  if (state.thirdPerson) {
    const head = player.position.clone().add(new THREE.Vector3(0, 1.2, 0));
    const desired = player.position.clone().add(new THREE.Vector3(0, 2.4, 6).applyEuler(new THREE.Euler(state.pitch * 0.3, state.yaw, 0, "YXZ")));
    const direction = desired.clone().sub(head).normalize();
    const distance = head.distanceTo(desired);
    raycaster.set(head, direction);
    const hits = raycaster.intersectObjects(blockMeshes, false);
    const finalPosition = hits.length && hits[0].distance < distance ? hits[0].point.clone().add(direction.clone().multiplyScalar(-0.35)) : desired;
    camera.position.lerp(finalPosition, 0.22);
    camera.lookAt(player.position.x, player.position.y + 1.2, player.position.z);
  } else {
    camera.position.copy(player.position);
  }
}

function attack() {
  const monster = targetedMonster();
  if (!monster) return false;
  monster.hp -= 2;
  return true;
}

function mine(delta) {
  const hit = targetedBlock();
  if (!hit) {
    state.miningKey = null;
    state.miningProgress = 0;
    return;
  }
  const key = blockKey(hit.object.userData.x, hit.object.userData.y, hit.object.userData.z);
  if (state.miningKey !== key) {
    state.miningKey = key;
    state.miningProgress = 0;
  }
  state.miningProgress += delta;
  dom.reticle.textContent = `${locale().mining} ${Math.min(100, Math.floor((state.miningProgress / MINE_DURATION) * 100))}%`;
  if (state.miningProgress >= MINE_DURATION) {
    const { x, y, z, id } = hit.object.userData;
    removeBlock(x, y, z, { change: true });
    player.inventory[id] = (player.inventory[id] || 0) + 1;
    player.chest[id] = player.inventory[id];
    refreshBuildBar();
    refreshAllItemsPanel();
    state.miningKey = null;
    state.miningProgress = 0;
  }
}

function placeBlock() {
  const current = buildItems[state.selectedBuild];
  if ((player.inventory[current.id] || 0) <= 0) {
    dom.reticle.textContent = locale().noBlocks;
    return;
  }
  const hit = targetedBlock();
  if (!hit) return;
  const pos = hit.object.position.clone().add(hit.face.normal);
  const x = Math.round(pos.x);
  const y = Math.round(pos.y);
  const z = Math.round(pos.z);
  if (new THREE.Vector3(x, y, z).distanceTo(player.position) < 1.8) return;
  if (addBlock(x, y, z, current.id, { change: true })) {
    player.inventory[current.id] -= 1;
    player.chest[current.id] = player.inventory[current.id];
    refreshBuildBar();
    refreshAllItemsPanel();
  }
}

function refreshActionState() {
  refreshActionButtons();
  dom.reticle.textContent = state.swordEquipped ? locale().activeSword : locale().activeBuild;
}

function startGame() {
  loadWorld();
  state.thirdPerson = settings.thirdPersonDefault;
  dom.menuScreen.classList.add("hidden");
  dom.hud.classList.remove("hidden");
  state.playing = true;
  refreshBuildBar();
  refreshBuildMenu();
  refreshAllItemsPanel();
  refreshActionState();
  updateHud();
  updateSky();
  updateCamera();
  updateAudio();
  dom.canvas.requestPointerLock();
}

function onRegister(event) {
  event.preventDefault();
  const username = dom.username.value.trim();
  const password = dom.password.value.trim();
  if (username.length < 3 || password.length < 4) {
    setMessage(locale().invalid);
    return;
  }
  saveAccount(username, password);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  if (state.playing) {
    state.time += delta / DAY_LENGTH;
    if (state.time >= 1) {
      state.time -= 1;
      state.day += 1;
    }
    state.saveTimer += delta;
    movePlayer(delta);
    updateMonsters(delta);
    updateSky();
    updateCamera();
    updateHud();
    if (state.leftMouseDown) {
      if (state.swordEquipped) attack();
      else mine(delta);
    } else if (!state.swordEquipped) {
      const hit = targetedBlock();
      dom.reticle.textContent = hit ? itemName(hit.object.userData.id) : locale().ready;
    } else {
      dom.reticle.textContent = locale().activeSword;
    }
    if (state.saveTimer >= SAVE_INTERVAL) {
      saveWorld();
      state.saveTimer = 0;
    }
    if (state.health <= 0) {
      state.health = MAX_HEALTH;
      spawnPlayer();
    }
  }
  renderer.render(scene, camera);
}

loadAccount();
loadSettings();
setAccountUI();
ensureInventory();
applyLanguage();
buildWorld();
spawnPlayer();
refreshBuildBar();
refreshBuildMenu();
refreshAllItemsPanel();
refreshActionButtons();
updateHud();
updateSky();
updateCamera();

dom.registerForm.addEventListener("submit", onRegister);
dom.playButton.addEventListener("click", () => {
  if (state.account) startGame();
});
dom.settingsButton.addEventListener("click", () => dom.settingsPanel.classList.toggle("hidden"));
dom.closeSettings.addEventListener("click", () => dom.settingsPanel.classList.add("hidden"));
dom.logoutButton.addEventListener("click", deleteAccount);
dom.worldButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dom.worldButtons.forEach((entry) => entry.classList.remove("active"));
    button.classList.add("active");
    state.worldId = button.dataset.world;
    updateHud();
  });
});
dom.swordButton.addEventListener("click", () => {
  state.swordEquipped = !state.swordEquipped;
  refreshActionState();
});
dom.itemsButton.addEventListener("click", () => {
  dom.allItemsPanel.classList.toggle("hidden");
  refreshActionButtons();
});
dom.closeItems.addEventListener("click", () => {
  dom.allItemsPanel.classList.add("hidden");
  refreshActionButtons();
});
dom.musicEnabled.addEventListener("change", () => {
  settings.musicEnabled = dom.musicEnabled.checked;
  saveSettings();
  updateAudio();
});
dom.musicVolume.addEventListener("input", () => {
  settings.volume = Number(dom.musicVolume.value) / 100;
  saveSettings();
  updateAudio();
});
dom.thirdPersonToggle.addEventListener("change", () => {
  settings.thirdPersonDefault = dom.thirdPersonToggle.checked;
  state.thirdPerson = settings.thirdPersonDefault;
  saveSettings();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement !== dom.canvas || !state.playing) return;
  state.yaw -= event.movementX * 0.0023;
  state.pitch -= event.movementY * 0.0023;
  state.pitch = THREE.MathUtils.clamp(state.pitch, -1.35, 1.2);
});

document.addEventListener("keydown", (event) => {
  if (event.code === "CapsLock") {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_KEY, state.lang);
    applyLanguage();
    return;
  }
  if (event.code === "KeyV" && state.playing) {
    state.thirdPerson = !state.thirdPerson;
    return;
  }
  if (event.code === "KeyI" && state.playing) {
    dom.allItemsPanel.classList.toggle("hidden");
    refreshActionButtons();
    return;
  }
  keys.add(event.code);
  if (event.code === "Space" && state.onGround) player.velocity.y = JUMP_FORCE;
  if (event.code.startsWith("Digit")) {
    const slot = Number(event.code.replace("Digit", "")) - 1;
    if (slot >= 0 && slot < buildItems.length) {
      state.selectedBuild = slot;
      state.swordEquipped = false;
      refreshBuildBar();
      refreshActionButtons();
    }
  }
});

document.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

window.addEventListener("mousedown", (event) => {
  if (!state.playing) return;
  if (document.pointerLockElement !== dom.canvas) {
    dom.canvas.requestPointerLock();
    updateAudio();
    return;
  }
  updateAudio();
  if (event.button === 0) state.leftMouseDown = true;
  if (event.button === 2 && !state.swordEquipped) placeBlock();
});

window.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    state.leftMouseDown = false;
    state.miningKey = null;
    state.miningProgress = 0;
  }
});

window.addEventListener("contextmenu", (event) => event.preventDefault());
window.addEventListener("beforeunload", () => saveWorld());

animate();
