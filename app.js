/* ==========================================================================
   Nexus Routine App - Core State Engine & Personal Routine Database
   ========================================================================== */

// Tana Routine Node IDs mapping for Routine field references
const TANA_ROUTINE_IDS = {
    "wakeup": "T4O7pvV4vGRL",
    "arrive_work": "Dv5OfRTONJw5",
    "mid_day": "pn38H9-hDz9R",
    "leave_work": "RVw0JkqKAOBH",
    "arrive_home": "b6RJ6xQSOwmt",
    "evening_review": "9Jv7G_XBwykm",
    "pre_bed": "uPNr5mwcmwtv"
};

// 1. Personal Routine Database (Extracted 100% from Obsidian 06_Routines/)
const ROUTINES_DB = {
    wakeup: {
        id: "wakeup",
        title: "Morning Wakeup Routine",
        icon: "🌅",
        window: "6:00 AM – 8:30 AM",
        area: "Wellbeing",
        variants: {
            "Standard": [
                { task: "Wake Up", emoji: "🌅", signifier: "critical", est: "5 min", notes: "Wake up before the Fajr sunrise cutoff (~6 AM)" },
                { task: "Bathroom & Wudu", emoji: "💧", signifier: "critical", est: "5 min", notes: "Perform wudu required for morning prayer" },
                { task: "Pray Fajr", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Establish your spiritual anchor with the Fajr prayer" },
                { task: "Hydrate", emoji: "🥛", signifier: "critical", est: "2 min", notes: "Drink water with a pinch of salt or electrolyte powder first thing after prayer" },
                { task: "Meditate", emoji: "🧘", signifier: "important", est: "15 min", notes: "Perform physiological sighing or a short sit for a nervous system reset" },
                { task: "Daily Intention", emoji: "🎯", signifier: "important", est: "5 min", notes: "Open Obsidian Daily Note and write: 'What ONE thing makes today a win?' — before opening other apps" },
                { task: "Grab Gym Bag", emoji: "🎒", signifier: "critical", est: "2 min", notes: "Grab your pre-packed gym bag (packed the night before)" },
                { task: "Gym Workout", emoji: "🏋️", signifier: "important", est: "45-60 min", notes: "45–60 min hypertrophy and longevity training. Log name, weight, and sets x reps.", callout: { type: "tip", title: "Training Log", text: "After each exercise: log details. Goal: 'Did I do more than last time?' Track it to make it training, not just exercise!" } },
                { task: "Sunlight Exposure", emoji: "☀️", signifier: "important", est: "10 min", notes: "Get direct outdoor light during your commute. Walk or park farther away.", callout: { type: "tip", title: "Sunlight Calibration", text: "Get sunlight within 30-60 min of waking. Outdoors only — sunlight through window glass doesn't count." } },
                { task: "Gym Hygiene", emoji: "🚿", signifier: "critical", est: "15 min", notes: "Complete your hygiene routine (Shower, Brush, Sunscreen, Deo) and change clothes at the gym" },
                { task: "Commute to Work", emoji: "🚗", signifier: "critical", est: "15 min", notes: "Leave for work by 8:30 AM" }
            ],
            "Low Energy": [
                { task: "Wake Up", emoji: "🌅", signifier: "critical", est: "2 min", notes: "Downshift expectations today and wake up gently" },
                { task: "Bathroom & Wudu", emoji: "💧", signifier: "critical", est: "5 min", notes: "Perform wudu required for morning prayer" },
                { task: "Pray Fajr", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Spiritual connection (make up qada immediately if missed)" },
                { task: "Hydrate", emoji: "🥛", signifier: "critical", est: "2 min", notes: "Drink fresh water to replenish fluids" },
                { task: "Mental Intention", emoji: "🧠", signifier: "important", est: "1 min", notes: "Mentally answer your ONE thing intention for the day — no writing required" },
                { task: "Morning Walk", emoji: "🚶", signifier: "important", est: "10 min", notes: "Skip the gym today. Take a quick 10-minute walk outside for light movement and outdoor light.", callout: { type: "warning", title: "Gym Skip Rule", text: "Do not reschedule gym to later the same day. Replace with a walk, reschedule gym to next available slot." } },
                { task: "Deep Rest Protocol", emoji: "💤", signifier: "important", est: "10 min", notes: "Run a 10-minute Non-Sleep Deep Rest (NSDR) session to restore cognitive function.", callout: { type: "tip", title: "NSDR Focus", text: "10 min of NSDR can recover cognitive function after a severely broken night of sleep." } },
                { task: "Hygiene", emoji: "🧴", signifier: "critical", est: "8 min", notes: "Compressed home hygiene: Brush, Sunscreen (non-negotiable), and change clothes" }
            ],
            "Weekend": [
                { task: "Wake Naturally", emoji: "🛌", signifier: "important", est: "5 min", notes: "Let your body rest naturally, ideally waking before 8 AM" },
                { task: "Bathroom & Wudu", emoji: "💧", signifier: "critical", est: "5 min", notes: "Perform wudu required for prayer" },
                { task: "Pray Fajr", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Establish your spiritual anchor" },
                { task: "Hydrate", emoji: "🥛", signifier: "critical", est: "2 min", notes: "Drink fresh water to replenish fluids" },
                { task: "Deep Meditation", emoji: "🧘", signifier: "important", est: "15 min", notes: "Longer 10–15 minute sitting meditation for deep nervous system alignment" },
                { task: "Weekend Intention", emoji: "🎯", signifier: "important", est: "3 min", notes: "Identify what outcome or connection will make this weekend day meaningful" },
                { task: "Active Rest", emoji: "🚶", signifier: "important", est: "45 min", notes: "Perform active rest or stretching (longer walk if resting)" },
                { task: "Sunlight Walk", emoji: "☀️", signifier: "important", est: "20 min", notes: "Take a relaxed 20–30 minute outdoor walk to soak in morning sun" },
                { task: "Hygiene", emoji: "🚿", signifier: "critical", est: "15 min", notes: "Perform a full, unhurried hygiene routine at home" },
                { task: "Family Breakfast", emoji: "🥞", signifier: "optional", est: "30 min", notes: "Enjoy a relaxed breakfast, connect with family, and avoid rushing" }
            ]
        }
    },
    arrive_work: {
        id: "arrive_work",
        title: "Morning Work Routine",
        icon: "💼",
        window: "First 20–30 min at desk",
        area: "SHOEBACCA",
        variants: {
            "Standard": [
                { task: "Obsidian Daily Note", emoji: "📓", signifier: "critical", est: "3 min", notes: "Open Obsidian Daily Note to set intentions for the day" },
                { task: "Review Schedule", emoji: "📅", signifier: "critical", est: "5 min", notes: "Glance at Outlook, Calendar, and Teams to scan your agenda" },
                { task: "Process Inboxes", emoji: "📥", signifier: "important", est: "10 min", notes: "Sort daily inboxes in strict order: Gmail → Messenger → Obsidian Inbox" },
                { task: "Refill Water", emoji: "💧", signifier: "important", est: "2 min", notes: "Fill up your water bottle — work hydration is non-negotiable" },
                { task: "Brew Green Tea", emoji: "🍵", signifier: "optional", est: "5 min", notes: "Prepare a fresh cup of green tea if time allows" }
            ],
            "High-Pressure / Late Start": [
                { task: "Daily Note Orientation", emoji: "📓", signifier: "critical", est: "2 min", notes: "Bare minimum: open Obsidian Daily Note and scan calendar to orient your mind.", callout: { type: "warning", title: "Do Not Skip", text: "Do not skip the Daily Note — even 2 minutes of orientation prevents reactive firefighting all day." } },
                { task: "Scan Outlook & Calendar", emoji: "📅", signifier: "critical", est: "3 min", notes: "Identify meetings and critical deadlines only" },
                { task: "Skip Inbox Sorting", emoji: "📭", signifier: "important", est: "1 min", notes: "Defer all email and message inbox sorting to the End of Day Review" }
            ],
            "WFH": [
                { task: "Obsidian Daily Note", emoji: "📓", signifier: "critical", est: "3 min", notes: "Open Obsidian Daily Note to set your WFH intentions" },
                { task: "Scan Calendar & Teams", emoji: "📅", signifier: "critical", est: "5 min", notes: "Check incoming communications and today's schedule" },
                { task: "Process WFH Inboxes", emoji: "📥", signifier: "important", est: "15 min", notes: "No commute pressure — take a little extra time to process inboxes" },
                { task: "Refill Water", emoji: "💧", signifier: "important", est: "2 min", notes: "Set up your hydration station" },
                { task: "Brew Green Tea", emoji: "🍵", signifier: "optional", est: "5 min", notes: "Enjoy a fresh cup of home-brewed green tea" }
            ],
            "Meeting-Heavy": [
                { task: "Scan Daily Agenda", emoji: "📓", signifier: "critical", est: "3 min", notes: "Assess meeting order, topics, and preparation requirements" },
                { task: "Block Focus Hour", emoji: "🔒", signifier: "critical", est: "5 min", notes: "Flag and block one hour on calendar for focus work before meetings begin" },
                { task: "Skip Inbox Sorting", emoji: "📭", signifier: "important", est: "1 min", notes: "Defer all inbox management to the End of Day Review" }
            ],
            "Tired": [
                { task: "Minimal Orientation", emoji: "🛌", signifier: "critical", est: "5 min", notes: "Follow minimal orientation: Daily Note and calendar check only" },
                { task: "Pomodoro Session", emoji: "⏱️", signifier: "important", est: "25 min", notes: "Set a timer to capture or process urgent items immediately before first meeting" }
            ]
        }
    },
    mid_day: {
        id: "mid_day",
        title: "Mid Day Routine",
        icon: "☀️",
        window: "Midday",
        area: "Wellbeing",
        variants: {
            "Standard": [
                { task: "Low Sodium Lunch", emoji: "🥗", signifier: "critical", est: "20 min", notes: "Eat a low-sodium lunch for wellbeing and renal safety" },
                { task: "Refill Water", emoji: "💧", signifier: "critical", est: "2 min", notes: "Refill your water bottle and drink up" },
                { task: "Blood Pressure Check", emoji: "🩺", signifier: "important", est: "3 min", notes: "Take blood pressure reading if monitoring and log in Obsidian" },
                { task: "Active Break", emoji: "🚶", signifier: "important", est: "10 min", notes: "Take a short walk or standing break to stretch your legs and break sitting inertia" }
            ]
        }
    },
    leave_work: {
        id: "leave_work",
        title: "End of Day Work Review",
        icon: "🔍",
        window: "30 min before leaving",
        area: "SHOEBACCA",
        variants: {
            "Standard": [
                { task: "Review Unfinished Tasks", emoji: "📋", signifier: "critical", est: "5 min", notes: "Reschedule or flag anything left undone in Tana or Obsidian" },
                { task: "Update Daily Note", emoji: "📓", signifier: "critical", est: "3 min", notes: "Log what happened, today's wins, blockers, and focus fields" },
                { task: "Set Tomorrow Priorities", emoji: "🎯", signifier: "important", est: "2 min", notes: "Identify three outcomes that would make tomorrow a win" },
                { task: "Clear Work Inboxes", emoji: "📥", signifier: "important", est: "10 min", notes: "Action, defer, or archive incoming items in Outlook and Teams" },
                { task: "Actual Budget Log", emoji: "💰", signifier: "important", est: "2 min", notes: "Open Actual Budget and log today's spend only (2 minutes max).", callout: { type: "tip", title: "Actual Budget Daily Habit", text: "2 min max. Log today's spend only. Weekly Review handles pattern analysis. Move to Pre-Bed if rushed." } }
            ],
            "Exhausted / Overwhelmed": [
                { task: "Daily Note Note", emoji: "📓", signifier: "critical", est: "2 min", notes: "Write 1–2 compressed sentences on where you left off" },
                { task: "Flag Top Task", emoji: "🚩", signifier: "critical", est: "1 min", notes: "Pick exactly one high-priority task for tomorrow and let the rest go" },
                { task: "Actual Budget Log", emoji: "💰", signifier: "important", est: "1 min", notes: "Take 60 seconds to log what spend you remember — partial is fine" },
                { task: "Defer Remaining Tasks", emoji: "💤", signifier: "important", est: "1 min", notes: "Defer all other inbox processing directly to the Evening Routine" }
            ],
            "Late / High-Pressure": [
                { task: "Compressed Review", emoji: "🩹", signifier: "critical", est: "5 min", notes: "Run compressed steps: Daily Note, Flag one task, 60s Budget" },
                { task: "Cal Newport Shutdown", emoji: "🔒", signifier: "critical", est: "1 min", notes: "Say 'Shutdown complete' out loud or write it in your Daily Note to disconnect mentally" }
            ],
            "Friday Weekly Bridge": [
                { task: "Standard Review", emoji: "📋", signifier: "critical", est: "22 min", notes: "Perform all Standard review steps: tasks, Daily Note, priorities, inboxes, budget" },
                { task: "Carryover Capture", emoji: "🌉", signifier: "critical", est: "5 min", notes: "Capture anything that needs to carry into the weekend or next week" },
                { task: "Set Monday Focus", emoji: "🎯", signifier: "important", est: "3 min", notes: "Establish Monday's main intention before logging off" }
            ]
        }
    },
    arrive_home: {
        id: "arrive_home",
        title: "Just Came Home Routine",
        icon: "🏠",
        window: "Immediately on arriving home",
        area: "Wellbeing",
        variants: {
            "Standard": [
                { task: "Welcome Home Kiss", emoji: "💖", signifier: "critical", est: "1 min", notes: "Greet Nazifa with a welcome kiss — always reconnect first" },
                { task: "Wash Hands", emoji: "🧼", signifier: "critical", est: "1 min", notes: "Clean up after your commute" },
                { task: "Change Clothes", emoji: "👕", signifier: "critical", est: "2 min", notes: "Change clothes to physically signal that work mode is OFF" },
                { task: "Home Shower", emoji: "🚿", signifier: "important", est: "10 min", notes: "Take a shower if a workout was completed this evening" },
                { task: "Healthy Dinner", emoji: "🍽️", signifier: "important", est: "20 min", notes: "Refuel with a healthy, low-sodium dinner" },
                { task: "Post Meal Walk", emoji: "🚶", signifier: "critical", est: "10-20 min", notes: "Take a minimum 10-minute outdoor walk for circadian clock calibration & glucose control.", callout: { type: "warning", title: "Non-Negotiable Walk", text: "10-min walk = up to 50% reduction in blood glucose spike + circadian clock calibration + parasympathetic activation. Minimum is 10 min. Outdoor only — pacing the apartment does not count." } },
                { task: "Deep Rest Session", emoji: "🧘", signifier: "important", est: "15 min", notes: "Perform a Non-Sleep Deep Rest (NSDR) or Yoga Nidra session to downshift the nervous system" }
            ],
            "Exhausted / Late Arrival": [
                { task: "Welcome Home Kiss", emoji: "💖", signifier: "critical", est: "1 min", notes: "Greet Nazifa with a welcome kiss — reconnect immediately" },
                { task: "Wash & Transition", emoji: "🧼", signifier: "critical", est: "3 min", notes: "Wash hands and change clothes to signal the end of work" },
                { task: "Light Dinner", emoji: "🥛", signifier: "important", est: "10 min", notes: "Have a light dinner or snack — don't skip eating entirely" },
                { task: "Post Meal Walk", emoji: "🚶", signifier: "critical", est: "10 min", notes: "Take a quick 10-minute walk outside — shorten but do not skip" },
                { task: "Deep Rest Protocol", emoji: "🧘", signifier: "important", est: "15 min", notes: "Prioritize NSDR over screen time to restore energy" }
            ],
            "Family-First": [
                { task: "Welcome Home Kiss", emoji: "💖", signifier: "critical", est: "1 min", notes: "Greet Nazifa with a welcome kiss — reconnect immediately" },
                { task: "Wash & Transition", emoji: "🧼", signifier: "critical", est: "3 min", notes: "Wash hands and change clothes for hygiene and boundary reset" },
                { task: "Family Connection", emoji: "👨‍👩‍👦", signifier: "critical", est: "30 min", notes: "Connect with Zain and family before personal admin or screens" },
                { task: "Family Walk", emoji: "🚶", signifier: "critical", est: "15 min", notes: "Take a post-meal walk — bring the family along if possible" }
            ],
            "No Dinner Yet": [
                { task: "Welcome Home Kiss", emoji: "💖", signifier: "critical", est: "1 min", notes: "Greet Nazifa with a welcome kiss — reconnect immediately" },
                { task: "Wash & Transition", emoji: "🧼", signifier: "critical", est: "3 min", notes: "Wash hands and change clothes for boundary transition" },
                { task: "Post Meal Walk", emoji: "🚶", signifier: "critical", est: "10 min", notes: "Run the walk after your first meal whenever it happens — do not let it slip past 9 PM." },
                { task: "Deep Rest Session", emoji: "🧘", signifier: "important", est: "15 min", notes: "Perform NSDR or Yoga Nidra to reset the nervous system" }
            ]
        }
    },
    evening_review: {
        id: "evening_review",
        title: "Evening Routine",
        icon: "🌆",
        window: "7:00 PM – 9:00 PM",
        area: "Wellbeing",
        variants: {
            "Standard": [
                { task: "Review Daily Note", emoji: "📓", signifier: "critical", est: "5 min", notes: "Reflect on how the day went, capturing gaps and wins" },
                { task: "Nazifa Connection", emoji: "💖", signifier: "critical", est: "10 min", notes: "No phones. 10-minute shared connection ritual — each share one thing from the day.", callout: { type: "tip", title: "Connection Ritual", text: "No phones for both. Each person shares ONE thing from their day (2 min each). Then just be together. Compressed (exhausted): 5 min. Never zero." } },
                { task: "Process Leftover Inboxes", emoji: "📥", signifier: "important", est: "10 min", notes: "Clear any leftover inboxes if not done during End of Day Review" },
                { task: "Admin Priority Task", emoji: "🗄️", signifier: "important", est: "30 min", notes: "Focus on ONE personal administration task (30 minutes max, then stop)" },
                { task: "Daily Compound Learning", emoji: "📚", signifier: "important", est: "20 min", notes: "Set a 20-minute timer for deliberate learning/reading (career, systems, curiosity).", callout: { type: "tip", title: "Daily Compound Focus", text: "Set a timer. Stop when it ends. Rotate weekly: (1) Career/profession, (2) System-building/PKM, (3) Curiosity." } },
                { task: "Intentional Leisure", emoji: "☕", signifier: "important", est: "45 min", notes: "Enjoy intentional leisure or family time — avoid default phone scrolling" }
            ],
            "Exhausted / Fallback": [
                { task: "Daily Note Review", emoji: "📓", signifier: "critical", est: "2 min", notes: "Reflect on today briefly (2 minutes is enough)" },
                { task: "Nazifa Connection", emoji: "💖", signifier: "critical", est: "5 min", notes: "Compress shared ritual to 5 minutes — never skip connection" },
                { task: "Single Priority Task", emoji: "🎯", signifier: "critical", est: "20 min", notes: "Complete exactly one priority task for 20 minutes, then stop" },
                { task: "Quick Inbox Pass", emoji: "📥", signifier: "important", est: "5 min", notes: "Quick pass only if energy allows" },
                { task: "Recharge & Rest", emoji: "💤", signifier: "critical", est: "30 min", notes: "Protect tomorrow's energy — avoid heavy work" }
            ],
            "Relationship-Only": [
                { task: "Nazifa Connection", emoji: "💖", signifier: "critical", est: "20 min", notes: "No timers — spend quality time connecting fully with Nazifa" },
                { task: "Screen Shutdown", emoji: "🔌", signifier: "critical", est: "1 min", notes: "Perform a hard shutdown on all screens, admin, and tasks after connection" },
                { task: "Early Downshift", emoji: "☕", signifier: "important", est: "30 min", notes: "Enjoy relaxed leisure or transition to early Pre-Bed routine" }
            ],
            "Admin-Only": [
                { task: "Nazifa Connection", emoji: "💖", signifier: "critical", est: "5 min", notes: "Connect with Nazifa first (5 minutes minimum)" },
                { task: "Focus Priority Task", emoji: "🎯", signifier: "critical", est: "30 min", notes: "Focus solely on your high-priority task for 30 minutes (skip compound learning)" }
            ],
            "Sleep-Protect": [
                { task: "Nazifa Connection", emoji: "💖", signifier: "critical", est: "5 min", notes: "Ensure you keep the shared connection ritual" },
                { task: "Screen Hard Cutoff", emoji: "🔌", signifier: "critical", est: "10 min", notes: "Enforce a hard cutoff for all screens and devices after 8:30 PM" },
                { task: "Early Pre Bed", emoji: "🛌", signifier: "critical", est: "10 min", notes: "Prepare for early sleep and transition to Pre-Bed at 9:00 PM" }
            ]
        }
    },
    pre_bed: {
        id: "pre_bed",
        title: "Pre-Bed Routine",
        icon: "🌙",
        window: "9:30 PM – 10:30 PM",
        area: "Wellbeing",
        variants: {
            "Full": [],
            "Moderate": [],
            "Compressed": [],
            "Emergency": []
        }
    }
};

// 2. Application State Machine
const STATE = {
    view: "dashboard",
    activeRoutine: null,
    activeVariant: null,
    activeSteps: [],
    currentStepIndex: 0,
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    stepSeconds: 0,
    stepDurations: [],
    completedCount: 0,
    skippedCount: 0,
    stepLogs: [],
    isTimerPaused: false,
    
    // User Settings
    settings: {
        webhookUrl: "http://localhost:8080/api/routine/trigger",
        webhookToken: "",
        tanaToken: "",
        tanaTargetNodeId: "INBOX",
        soundEnabled: true,
        notificationsEnabled: false,
        theme: "dark"
    },
    
    // Context for routine adaptation (specifically wakeup)
    routineContext: {
        dayOfWeek: "",
        wakeUpTime: "",
        workoutToday: true,
        eveningRoutineCompleted: true
    }
};

// Audio Chimes synthesizer using browser Web Audio API (satisfaction cues!)
const AUDIO = {
    ctx: null,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    
    playStepChime() {
        if (!STATE.settings.soundEnabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Simple elegant double chime (satisfying ding!)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
        
        gain1.gain.setValueAtTime(0.1, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.3);
    },
    
    playCompleteChime() {
        if (!STATE.settings.soundEnabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Arpeggio chime on routine completion
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            
            gain.gain.setValueAtTime(0.15, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.4);
        });
    }
};

// Webhook Dispatcher
async function fireWebhook(event, data) {
    if (!STATE.settings.webhookUrl) return;
    
    const payload = {
        event: event,
        timestamp: new Date().toISOString(),
        routine: STATE.activeRoutine ? STATE.activeRoutine.id : null,
        variant: STATE.activeVariant,
        data: data
    };
    
    const headers = {
        "Content-Type": "application/json"
    };
    if (STATE.settings.webhookToken) {
        headers["Authorization"] = `Bearer ${STATE.settings.webhookToken}`;
    }
    
    try {
        console.log(`[Webhook] Dispatching event '${event}' to ${STATE.settings.webhookUrl}`);
        const response = await fetch(STATE.settings.webhookUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
            mode: "cors"
        });
        if (response.ok) {
            console.log(`[Webhook] Event '${event}' successfully dispatched.`);
        } else {
            console.warn(`[Webhook] Dispatch failed. Status: ${response.status}`);
        }
    } catch (e) {
        console.warn(`[Webhook] Connection error during dispatch: ${e.message}`);
    }
}

// Browser Push Notifications
function requestNotificationPermission() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            STATE.settings.notificationsEnabled = (permission === "granted");
            saveSettings();
        });
    }
}

function sendLocalNotification(title, text) {
    if (!STATE.settings.notificationsEnabled || !("Notification" in window)) return;
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: text,
            icon: "https://tana.inc/logo/tana-symbol-color-lightbg-tightcrop.png"
        });
    }
}

// 3. UI State Transitions & Views
const VARIANT_LOGOS = {
    "Standard": "📋",
    "Low Energy / Late": "⚡",
    "Weekend": "🏖️",
    "Poor Sleep / Zain Wake": "👶",
    "High-Pressure / Late Start": "🚨",
    "WFH": "🏠",
    "Meeting-Heavy": "📅",
    "Tired": "🥱",
    "Exhausted / Overwhelmed": "😫",
    "Late / High-Pressure": "⏱️",
    "Friday Weekly Bridge": "Bridge 🌉",
    "Exhausted / Late Arrival": "🔋",
    "Family-First": "👨‍👩‍👦",
    "No Dinner Yet": "🍽️",
    "Exhausted / Fallback": "🍂",
    "Relationship-Only": "💖",
    "Admin-Only": "🗄️",
    "Sleep-Protect": "🔒",
    "Late Night / Exhausted": "🌌",
    "Workday Next Morning": "💼",
    "HBP (High Blood Pressure)": "🩺",
    "Short on Time or Energy": "⚡"
};

function getVariantLogo(varName) {
    return VARIANT_LOGOS[varName] || "🔄";
}

function showView(viewId) {
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const activePanel = document.getElementById(`view-${viewId}`);
    if (activePanel) {
        activePanel.classList.add("active");
        STATE.view = viewId;
    }
    
    // Add/remove wide mode based on panel
    const appContainer = document.querySelector(".app-container");
    const exitBtn = document.getElementById("btn-exit-routine");
    
    if (viewId === "sequencer") {
        appContainer.classList.add("wide-mode");
        if (exitBtn) exitBtn.style.display = "flex";
    } else {
        appContainer.classList.remove("wide-mode");
        if (exitBtn) exitBtn.style.display = "none";
        // Ensure sidebar is closed when switching away
        document.getElementById("sequencer-sidebar").classList.remove("active");
    }
    
    window.scrollTo(0, 0);
}

// Render Dashboard Routines List
function renderDashboard() {
    const grid = document.getElementById("routine-list-grid");
    grid.innerHTML = "";
    
    Object.keys(ROUTINES_DB).forEach(key => {
        const routine = ROUTINES_DB[key];
        const card = document.createElement("div");
        card.className = "routine-card";
        card.onclick = () => selectRoutine(key);
        
        let windowStr = routine.window;
        if (key === "pre_bed" && STATE.sleepTargets) {
            initPreBedContext();
            const steps = assemblePreBedSteps("Full", STATE.routineContext);
            const durationMin = getDurationMinutes(steps);
            
            const [bedHrs, bedMins] = STATE.sleepTargets.targetBedtime.split(':').map(Number);
            
            // End time = Target Bedtime - 15 minutes
            let endHrs = bedHrs;
            let endMins = bedMins - 15;
            if (endMins < 0) {
                endMins += 60;
                endHrs = (endHrs - 1 + 24) % 24;
            }
            
            // Start time = End time - durationMin
            let startHrs = endHrs;
            let startMins = endMins - durationMin;
            while (startMins < 0) {
                startMins += 60;
                startHrs = (startHrs - 1 + 24) % 24;
            }
            
            const pad = (n) => String(n).padStart(2, '0');
            const startStr = `${pad(startHrs)}:${pad(startMins)}`;
            const endStr = `${pad(endHrs)}:${pad(endMins)}`;
            
            windowStr = `${PrayerService.formatTo12Hour(startStr)} – ${PrayerService.formatTo12Hour(endStr)}`;
        }
        
        card.innerHTML = `
            <div class="routine-icon">${routine.icon}</div>
            <div class="routine-details">
                <h3>${routine.title}</h3>
                <div class="routine-meta-row">
                    <span>⏱️ ${windowStr}</span>
                </div>
            </div>
            <div class="arrow-indicator">➔</div>
        `;
        grid.appendChild(card);
    });
    
    // Set Header Date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById("current-date-badge").innerText = new Date().toLocaleDateString('en-US', options);
}

function getDurationMinutes(steps) {
    let total = 0;
    steps.forEach(step => {
        const estStr = step.est || "";
        const matches = estStr.match(/\d+/g);
        if (matches && matches.length > 0) {
            if (matches.length > 1) {
                total += parseInt(matches[1], 10); // Take upper bound (e.g. 60 from "45-60")
            } else {
                total += parseInt(matches[0], 10);
            }
        }
    });
    return total;
}

function formatDuration(minutes) {
    if (minutes >= 60) {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    }
    return `${minutes}m`;
}

function parseEstToSeconds(estStr) {
    if (!estStr) return 0;
    const matches = estStr.match(/\d+/g);
    if (!matches || matches.length === 0) return 0;
    let mins = 0;
    if (matches.length > 1) {
        mins = parseInt(matches[1], 10); // Upper bound
    } else {
        mins = parseInt(matches[0], 10);
    }
    return mins * 60;
}

function getCumulativeEstimateSeconds(untilIndex) {
    let totalSeconds = 0;
    for (let i = 0; i < untilIndex; i++) {
        const step = STATE.activeSteps[i];
        if (step) {
            totalSeconds += parseEstToSeconds(step.est);
        }
    }
    return totalSeconds;
}

function formatActualDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
        return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
}

// Check if evening routine was completed yesterday/last night (within last 18 hours)
function checkEveningRoutineCompletedLastNight() {
    try {
        const history = JSON.parse(localStorage.getItem("routine_history") || "[]");
        if (history.length === 0) return true; // Default to true if no history
        
        // Find the last completed "evening_review" routine
        const eveningLogs = history
            .filter(log => log.routineId === "evening_review")
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
        if (eveningLogs.length === 0) return false;
        
        const lastTime = new Date(eveningLogs[0].timestamp);
        const now = new Date();
        const diffHrs = (now - lastTime) / (1000 * 60 * 60);
        
        return diffHrs <= 18;
    } catch (e) {
        console.error("Error checking evening routine history:", e);
        return true;
    }
}

// Initialize the routine context with auto-detected values
function initRoutineContext() {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const isWeekend = (dayName === "Saturday" || dayName === "Sunday");
    
    // Default wake up time as HH:MM in local time
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hrs}:${mins}`;
    
    STATE.routineContext = {
        dayOfWeek: dayName,
        wakeUpTime: timeStr,
        workoutToday: !isWeekend, // Default to true on weekdays, false on weekends
        eveningRoutineCompleted: checkEveningRoutineCompletedLastNight()
    };
}

// Evaluate the recommendation engine rules
function getRecommendedVariant() {
    const day = STATE.routineContext.dayOfWeek;
    const wakeTime = STATE.routineContext.wakeUpTime;
    const eveningDone = STATE.routineContext.eveningRoutineCompleted;
    
    // Rule 1: Weekend
    if (day === "Saturday" || day === "Sunday") {
        return {
            variant: "Weekend",
            reason: `Based on ${day} (Weekend) context.`
        };
    }
    
    // Parse wake up time
    let isLateWakeup = false;
    if (wakeTime) {
        const parts = wakeTime.split(':');
        if (parts.length === 2) {
            const hrs = parseInt(parts[0], 10);
            const mins = parseInt(parts[1], 10);
            if (hrs > 7 || (hrs === 7 && mins > 30)) {
                isLateWakeup = true;
            }
        }
    }
    
    // Rule 2: Low Energy / Sleep Recovery
    if (!eveningDone || isLateWakeup) {
        let reason = "";
        if (!eveningDone && isLateWakeup) {
            reason = "Based on late wakeup after 7:30 AM and incomplete sleep hygiene last night.";
        } else if (!eveningDone) {
            reason = "Based on incomplete sleep hygiene last night.";
        } else {
            reason = "Based on late wakeup after 7:30 AM.";
        }
        return {
            variant: "Low Energy",
            reason: reason
        };
    }
    
    // Rule 3: Standard
    return {
        variant: "Standard",
        reason: `Based on ${day} context and active workout intention.`
    };
}

// Update the recommendation box and duration estimation
function updateWakeupRecommendationUI() {
    const rec = getRecommendedVariant();
    
    const recNameEl = document.getElementById("rec-variant-name");
    const recReasonEl = document.getElementById("rec-reasoning");
    const recDurationEl = document.getElementById("rec-duration");
    const startBtn = document.getElementById("btn-start-recommended");
    
    if (recNameEl) recNameEl.innerText = `${rec.variant} Variant`;
    if (recReasonEl) recReasonEl.innerText = rec.reason;
    
    // Calculate recommended duration based on the active steps
    let steps = [...ROUTINES_DB.wakeup.variants[rec.variant]];
    if (rec.variant === "Standard" && !STATE.routineContext.workoutToday) {
        // Apply steps filtering
        steps = steps.filter(s => s.task !== "Grab Gym Bag" && s.task !== "Gym Workout" && s.task !== "Gym Hygiene");
        // Insert walk and hygiene
        const dailyIntentionIdx = steps.findIndex(s => s.task === "Daily Intention");
        const insertIdx = dailyIntentionIdx !== -1 ? dailyIntentionIdx + 1 : 6;
        steps.splice(insertIdx, 0, 
            { task: "Morning Walk", emoji: "🚶", est: "10 min" },
            { task: "Hygiene", emoji: "🧴", est: "8 min" }
        );
    }
    
    const totalMin = getDurationMinutes(steps);
    if (recDurationEl) recDurationEl.innerText = formatDuration(totalMin);
    
    // Store recommended variant in a data attribute on start button
    if (startBtn) {
        startBtn.dataset.recommendedVariant = rec.variant;
    }
}

// Helper to set visual state of toggle buttons
function setToggleState(groupId, value) {
    const btns = document.querySelectorAll(`#${groupId} .toggle-btn`);
    btns.forEach(btn => {
        const val = btn.dataset.val === "true";
        if (val === value) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Helper to set visual state of energy buttons
function setEnergyState(groupId, value) {
    const btns = document.querySelectorAll(`#${groupId} .energy-btn`);
    btns.forEach(btn => {
        if (btn.dataset.val === value) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Initialize the pre-bed context with auto-detected values
function initPreBedContext() {
    const now = new Date();
    
    // Sleep day adjustment: if before 5 AM, contextually it is the previous day
    const contextualDate = new Date(now);
    if (now.getHours() < 5) {
        contextualDate.setDate(contextualDate.getDate() - 1);
    }
    
    const dayName = contextualDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Friday/Saturday evenings: no work the next day.
    // Sunday-Thursday evenings: work the next day.
    const isWeekendTomorrow = (dayName === "Friday" || dayName === "Saturday");
    const workdayTomorrow = !isWeekendTomorrow;
    
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hrs}:${mins}`;
    
    STATE.routineContext = {
        dayOfWeek: dayName,
        currentTime: timeStr,
        workdayTomorrow: workdayTomorrow,
        energyLevel: "Normal"
    };
}

// Calculate the pre-bed recommendation tier and details based on current time and targets
function getPreBedRecommendation(refDate) {
    let bedtimeStr = "22:00"; // Default fallback to 10 PM
    if (STATE.sleepTargets && STATE.sleepTargets.targetBedtime) {
        bedtimeStr = STATE.sleepTargets.targetBedtime;
    }
    
    const now = refDate || new Date();
    const [bedHrs, bedMins] = bedtimeStr.split(':').map(Number);
    
    // Construct target bedtime Date object
    const targetBedtimeDate = new Date(now);
    targetBedtimeDate.setHours(bedHrs, bedMins, 0, 0);
    
    // Adjust target date if bedtime spans midnight
    let diffMs = targetBedtimeDate - now;
    if (bedHrs < 6 && now.getHours() >= 18) {
        targetBedtimeDate.setDate(targetBedtimeDate.getDate() + 1);
        diffMs = targetBedtimeDate - now;
    } else if (now.getHours() < 6 && bedHrs >= 18) {
        targetBedtimeDate.setDate(targetBedtimeDate.getDate() - 1);
        diffMs = targetBedtimeDate - now;
    }
    
    const timeBudgetMin = Math.floor(diffMs / 60000);
    
    let tier = "Full";
    let reason = "";
    
    if (timeBudgetMin >= 60) {
        tier = "Full";
        reason = `You have plenty of time (${timeBudgetMin} min) before your target bedtime (${PrayerService.formatTo12Hour(bedtimeStr)}).`;
    } else if (timeBudgetMin >= 30) {
        tier = "Moderate";
        reason = `Time is running short (${timeBudgetMin} min remaining until target bedtime ${PrayerService.formatTo12Hour(bedtimeStr)}).`;
    } else if (timeBudgetMin >= 15) {
        tier = "Compressed";
        reason = `You are close to your target bedtime (${timeBudgetMin} min remaining until ${PrayerService.formatTo12Hour(bedtimeStr)}).`;
    } else {
        tier = "Emergency";
        reason = `You are past or within 15 minutes of your target bedtime (${timeBudgetMin} min remaining until ${PrayerService.formatTo12Hour(bedtimeStr)}).`;
    }
    
    // Energy level modifier
    const energy = STATE.routineContext.energyLevel;
    if (energy === "Exhausted") {
        let prevTier = tier;
        if (tier === "Full") tier = "Moderate";
        else if (tier === "Moderate") tier = "Compressed";
        else if (tier === "Compressed") tier = "Emergency";
        
        if (prevTier !== tier) {
            reason += ` Downscaled to ${tier} tier due to Exhausted energy level.`;
        }
    }
    
    return {
        tier: tier,
        reason: reason,
        timeBudget: timeBudgetMin
    };
}

// Assemble steps dynamically for Pre-Bed routine
function assemblePreBedSteps(tier, context) {
    const steps = [];
    const isWorkday = context.workdayTomorrow;
    
    // 1. Oral Hygiene (Emergency+)
    steps.push({
        task: "Oral Hygiene",
        emoji: "🪥",
        signifier: "critical",
        est: "5 min",
        notes: "Perform complete oral hygiene (Brush, Floss, Salt Gargle)"
    });
    
    // 2. Warm Shower (Full only)
    if (tier === "Full") {
        steps.push({
            task: "Warm Shower",
            emoji: "🚿",
            signifier: "critical",
            est: "15 min",
            notes: "Take a warm shower for thermal cooling (sleep signal) and spiritual cleanliness"
        });
    }
    
    // 3. Pray Isha (Emergency+)
    steps.push({
        task: "Pray Isha",
        emoji: "🕌",
        signifier: "critical",
        est: "10 min",
        notes: "Establish Isha prayer — spiritual close (non-negotiable)"
    });
    
    // 4. Quick Declutter (Moderate+)
    if (tier === "Full" || tier === "Moderate") {
        steps.push({
            task: "Quick Declutter",
            emoji: "🧹",
            signifier: "important",
            est: "10 min",
            notes: "Set a 10-minute timer to declutter high-visibility areas and kitchen counters.",
            callout: {
                type: "tip",
                title: "Quick Declutter",
                text: "Set a timer, stop when it goes off. High-visibility areas only: kitchen counter, living room, bedroom floor, bag staged by the door."
            }
        });
    }
    
    // 5. Vitamins & Supplements (Compressed+)
    if (tier !== "Emergency") {
        steps.push({
            task: "Vitamins & Supplements",
            emoji: "💊",
            signifier: "critical",
            est: "2 min",
            notes: "Take your evening vitamins and fish oil supplements"
        });
    }
    
    // 6. Log Blood Pressure (Moderate+, assumed always per comment)
    if (tier === "Full" || tier === "Moderate") {
        steps.push({
            task: "Log Blood Pressure",
            emoji: "🩺",
            signifier: "important",
            est: "2 min",
            notes: "Log your evening blood pressure reading in Obsidian Daily Note"
        });
    }
    
    // 7. Evening Skincare (Full only)
    if (tier === "Full") {
        steps.push({
            task: "Evening Skincare",
            emoji: "🧴",
            signifier: "important",
            est: "5 min",
            notes: "Cleanse, moisturize, and apply active skincare"
        });
    }
    
    // 8. Stage Commute Gear (Moderate+ & Workday)
    if ((tier === "Full" || tier === "Moderate") && isWorkday) {
        steps.push({
            task: "Stage Commute Gear",
            emoji: "🎒",
            signifier: "critical",
            est: "10 min",
            notes: "Pack your work bag, stage lunch, and fill water bottle to enable tomorrow's morning.",
            callout: {
                type: "warning",
                title: "Staging Bag",
                text: "Skipping bag packing means 5–10 extra minutes lost in the morning rush."
            }
        });
    }
    
    // 9. Set Wake Alarm (Compressed+ & Workday)
    if (tier !== "Emergency" && isWorkday) {
        steps.push({
            task: "Set Wake Alarm",
            emoji: "⏰",
            signifier: "critical",
            est: "1 min",
            notes: "Confirm and set wake-up alarm before launching sleep protocol"
        });
    }
    
    // 10. Charge Devices (Emergency+)
    steps.push({
        task: "Charge Devices",
        emoji: "🔌",
        signifier: "critical",
        est: "2 min",
        notes: "Plug in phone and watch (charge phone away from bed if possible)"
    });
    
    // 11. Gentle Stretching (Full only)
    if (tier === "Full") {
        steps.push({
            task: "Gentle Stretching",
            emoji: "🧘",
            signifier: "important",
            est: "8 min",
            notes: "Perform gentle Yin yoga stretching for neck and shoulder release"
        });
    }
    
    // 12. Yoga Nidra Sleep (Full only)
    if (tier === "Full") {
        steps.push({
            task: "Yoga Nidra Sleep",
            emoji: "💤",
            signifier: "important",
            est: "15 min",
            notes: "Run a Yoga Nidra or NSDR session to trigger deeply restorative sleep"
        });
    }
    
    return steps;
}

// Update the pre-bed recommendation display in selector UI
function updatePreBedRecommendationUI() {
    const rec = getPreBedRecommendation();
    
    const recNameEl = document.getElementById("prebed-rec-name");
    const recReasonEl = document.getElementById("prebed-rec-reasoning");
    const recDurationEl = document.getElementById("prebed-rec-duration");
    const startBtn = document.getElementById("btn-prebed-start");
    const emergencyBanner = document.getElementById("prebed-emergency-banner");
    
    if (recNameEl) recNameEl.innerText = `${rec.tier} Tier`;
    if (recReasonEl) recReasonEl.innerText = rec.reason;
    
    const steps = assemblePreBedSteps(rec.tier, STATE.routineContext);
    const totalMin = getDurationMinutes(steps);
    if (recDurationEl) recDurationEl.innerText = formatDuration(totalMin);
    
    if (startBtn) {
        startBtn.dataset.recommendedTier = rec.tier;
        startBtn.innerText = `Start Suggested Routine (${formatDuration(totalMin)})`;
    }
    
    if (emergencyBanner) {
        if (rec.tier === "Emergency") {
            emergencyBanner.innerHTML = `
                <div class="emergency-alert-banner">
                    <span class="emergency-alert-icon">🚨</span>
                    <div class="emergency-alert-content">
                        <h4>Sleep Deadline Breached</h4>
                        <p>You have only ${rec.timeBudget}m remaining. Protect your Fajr wakeup: pray, plug in, and sleep immediately.</p>
                    </div>
                </div>
            `;
            emergencyBanner.style.display = "flex";
        } else {
            emergencyBanner.style.display = "none";
        }
    }
}

// Initialize Prayer Widget on App Start
async function initPrayerWidget() {
    try {
        const widget = document.getElementById("prayer-info-widget");
        if (!widget) return;
        
        let timings = PrayerService.getCachedData()?.timings;
        if (!timings) {
            console.log("[Prayer] Requesting coordinates for prayer times...");
            const coords = await PrayerService.getCoordinates();
            timings = await PrayerService.fetchTimings(coords.latitude, coords.longitude);
        }
        
        if (timings) {
            const targets = PrayerService.calculateSleepTargets(timings.Sunrise);
            widget.innerHTML = `
                <div class="prayer-widget-item">
                    <span class="prayer-widget-label">🕌 Fajr</span>
                    <span class="prayer-widget-val">${PrayerService.formatTo12Hour(timings.Fajr)}</span>
                </div>
                <div class="prayer-widget-item">
                    <span class="prayer-widget-label">🌅 Sunrise</span>
                    <span class="prayer-widget-val">${PrayerService.formatTo12Hour(timings.Sunrise)}</span>
                </div>
                <div class="prayer-widget-item">
                    <span class="prayer-widget-label">⏰ Latest Wake</span>
                    <span class="prayer-widget-val">${PrayerService.formatTo12Hour(targets.latestWakeUp)}</span>
                </div>
                <div class="prayer-widget-item highlight-item">
                    <span class="prayer-widget-label">🛌 Bedtime</span>
                    <span class="prayer-widget-val">${PrayerService.formatTo12Hour(targets.targetBedtime)}</span>
                </div>
            `;
            widget.style.display = "grid";
            
            STATE.prayerTimings = timings;
            STATE.sleepTargets = targets;
            renderDashboard(); // Re-render dashboard to show dynamic pre-bed window
        }
    } catch (e) {
        console.warn("[Prayer] Could not initialize prayer widget:", e);
        const widget = document.getElementById("prayer-info-widget");
        if (widget) {
            widget.innerHTML = `
                <div style="grid-column: span 4; text-align: center; font-size: 0.8rem; color: var(--text-muted); padding: 8px;">
                    ⚠️ Geolocation or internet required for accurate prayer-driven sleep scheduling.
                    <button onclick="window.retryPrayerTimes()" class="manual-override-btn" style="display:inline-block; margin-left: 10px; padding: 2px 8px; font-size: 0.75rem;">Retry</button>
                </div>
            `;
            widget.style.display = "grid";
        }
    }
}

window.retryPrayerTimes = async function() {
    localStorage.removeItem(PrayerService.cacheKey);
    await initPrayerWidget();
};

// Step 1: Click Routine -> Show Variant selector
function selectRoutine(routineKey) {
    const routine = ROUTINES_DB[routineKey];
    STATE.activeRoutine = routine;
    
    document.getElementById("selector-routine-icon").innerText = routine.icon;
    document.getElementById("selector-routine-name").innerText = routine.title;
    document.getElementById("selector-routine-window").innerText = `Ideal window: ${routine.window}`;
    
    const selectionCard = document.querySelector(".selection-card");
    
    if (routineKey === "wakeup") {
        initRoutineContext();
        
        // Render custom context selection card
        selectionCard.innerHTML = `
            <h2>How are you approaching this routine today?</h2>
            <p class="selection-sub">Select your context to dynamically calibrate your sequence steps.</p>
            
            <div class="context-card-container">
                <div class="context-grid">
                    <!-- Day of Week selector -->
                    <div class="context-item">
                        <span class="context-icon">📅</span>
                        <div class="context-field-wrapper">
                            <label for="input-day-of-week">Day of Week</label>
                            <select id="input-day-of-week" class="context-select">
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>

                    <!-- Wake Up Time input -->
                    <div class="context-item">
                        <span class="context-icon">⏰</span>
                        <div class="context-field-wrapper">
                            <label for="input-wakeup-time">Woke up at</label>
                            <input type="time" id="input-wakeup-time" class="context-input-time">
                        </div>
                    </div>

                    <!-- Workout Today Toggle -->
                    <div class="context-item wide-item">
                        <span class="context-icon">💪</span>
                        <div class="context-field-wrapper">
                            <label>Workout Today?</label>
                            <div class="toggle-group" id="toggle-workout">
                                <button type="button" class="toggle-btn" data-val="true">Yes</button>
                                <button type="button" class="toggle-btn" data-val="false">No</button>
                            </div>
                        </div>
                    </div>

                    <!-- Evening Routine Completed Toggle -->
                    <div class="context-item wide-item">
                        <span class="context-icon">🌙</span>
                        <div class="context-field-wrapper">
                            <label>Evening Routine Completed Last Night?</label>
                            <div class="toggle-group" id="toggle-evening">
                                <button type="button" class="toggle-btn" data-val="true">Yes</button>
                                <button type="button" class="toggle-btn" data-val="false">No</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recommendation-box">
                    <div class="recommendation-header">
                        <span class="recommendation-bulb">💡</span>
                        <h3>Recommendation: <span id="rec-variant-name" class="rec-highlight">Standard Variant</span></h3>
                    </div>
                    <p id="rec-reasoning" class="recommendation-reasoning">
                        Based on weekday context and active workout intention.
                    </p>
                </div>

                <button id="btn-start-recommended" class="btn-full primary-btn pulse-glow" style="margin-top: 10px; width: 100%; font-family: inherit; font-size: 1rem; font-weight: 700; height: 50px; border: none; border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; background: var(--gradient-primary); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
                    Start Suggested Routine (<span id="rec-duration">18m</span>)
                </button>

                <div class="manual-override-section">
                    <span class="manual-override-label">Or pick manually:</span>
                    <div class="manual-btn-group">
                        <button class="manual-override-btn" data-variant="Standard">Standard</button>
                        <button class="manual-override-btn" data-variant="Low Energy">Low Energy</button>
                        <button class="manual-override-btn" data-variant="Weekend">Weekend</button>
                    </div>
                </div>
            </div>
        `;
        
        // Set values from STATE.routineContext
        const selectDay = document.getElementById("input-day-of-week");
        const inputTime = document.getElementById("input-wakeup-time");
        
        if (selectDay) selectDay.value = STATE.routineContext.dayOfWeek;
        if (inputTime) inputTime.value = STATE.routineContext.wakeUpTime;
        
        // Set toggles active classes
        setToggleState("toggle-workout", STATE.routineContext.workoutToday);
        setToggleState("toggle-evening", STATE.routineContext.eveningRoutineCompleted);
        
        // Bind change events
        if (selectDay) {
            selectDay.onchange = (e) => {
                STATE.routineContext.dayOfWeek = e.target.value;
                // Automatically toggle workout today if switching to weekend / weekday
                const isWeekend = (e.target.value === "Saturday" || e.target.value === "Sunday");
                STATE.routineContext.workoutToday = !isWeekend;
                setToggleState("toggle-workout", STATE.routineContext.workoutToday);
                updateWakeupRecommendationUI();
            };
        }
        
        if (inputTime) {
            inputTime.onchange = (e) => {
                STATE.routineContext.wakeUpTime = e.target.value;
                updateWakeupRecommendationUI();
            };
        }
        
        // Toggle Workout bindings
        const workoutToggles = document.querySelectorAll("#toggle-workout .toggle-btn");
        workoutToggles.forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.val === "true";
                STATE.routineContext.workoutToday = val;
                setToggleState("toggle-workout", val);
                updateWakeupRecommendationUI();
            };
        });
        
        // Toggle Evening bindings
        const eveningToggles = document.querySelectorAll("#toggle-evening .toggle-btn");
        eveningToggles.forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.val === "true";
                STATE.routineContext.eveningRoutineCompleted = val;
                setToggleState("toggle-evening", val);
                updateWakeupRecommendationUI();
            };
        });
        
        // Start recommended button binding
        const startBtn = document.getElementById("btn-start-recommended");
        if (startBtn) {
            startBtn.onclick = () => {
                const recommended = startBtn.dataset.recommendedVariant || "Standard";
                startRoutine("wakeup", recommended);
            };
        }
        
        // Manual overrides buttons binding
        const manualBtns = document.querySelectorAll(".manual-override-btn");
        manualBtns.forEach(btn => {
            btn.onclick = () => {
                const varName = btn.dataset.variant;
                startRoutine("wakeup", varName);
            };
        });
        
        // Initial draw of recommendation
        updateWakeupRecommendationUI();
        
    } else if (routineKey === "pre_bed") {
        initPreBedContext();
        
        selectionCard.innerHTML = `
            <h2>How are you approaching this routine today?</h2>
            <p class="selection-sub">Select your context to dynamically calibrate your sequence steps.</p>
            
            <div class="context-card-container">
                <div class="context-grid">
                    <!-- Day of Week selector -->
                    <div class="context-item">
                        <span class="context-icon">📅</span>
                        <div class="context-field-wrapper">
                            <label for="input-prebed-day">Day of Week</label>
                            <select id="input-prebed-day" class="context-select" disabled>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>

                    <!-- Current Time input -->
                    <div class="context-item">
                        <span class="context-icon">⏰</span>
                        <div class="context-field-wrapper">
                            <label for="input-prebed-time">Current Time</label>
                            <input type="time" id="input-prebed-time" class="context-input-time" disabled>
                        </div>
                    </div>

                    <!-- Tomorrow is Workday Toggle -->
                    <div class="context-item wide-item">
                        <span class="context-icon">💼</span>
                        <div class="context-field-wrapper">
                            <label>Tomorrow is a Workday?</label>
                            <div class="toggle-group" id="toggle-prebed-workday">
                                <button type="button" class="toggle-btn" data-val="true">Yes</button>
                                <button type="button" class="toggle-btn" data-val="false">No</button>
                            </div>
                        </div>
                    </div>

                    <!-- Energy Level Selector -->
                    <div class="context-item wide-item">
                        <span class="context-icon">⚡</span>
                        <div class="context-field-wrapper">
                            <label>Energy Level Tonight?</label>
                            <div class="energy-group" id="group-prebed-energy">
                                <button type="button" class="energy-btn energy-fresh" data-val="Fresh">Fresh</button>
                                <button type="button" class="energy-btn energy-normal" data-val="Normal">Normal</button>
                                <button type="button" class="energy-btn energy-exhausted" data-val="Exhausted">Exhausted</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="prebed-emergency-banner" style="display:none; margin-top: 10px;"></div>

                <div class="recommendation-box" style="margin-top: 15px;">
                    <div class="recommendation-header">
                        <span class="recommendation-bulb">💡</span>
                        <h3>Suggested: <span id="prebed-rec-name" class="rec-highlight">Standard Variant</span></h3>
                    </div>
                    <p id="prebed-rec-reasoning" class="recommendation-reasoning">
                        Based on context inputs.
                    </p>
                </div>

                <button id="btn-prebed-start" class="btn-full primary-btn pulse-glow" style="margin-top: 15px; width: 100%; font-family: inherit; font-size: 1rem; font-weight: 700; height: 50px; border: none; border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; background: var(--gradient-primary); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
                    Start Suggested Routine
                </button>

                <div class="manual-override-section" style="margin-top: 15px;">
                    <span class="manual-override-label">Or pick manually:</span>
                    <div class="manual-btn-group">
                        <button class="manual-override-btn prebed-override-btn" data-tier="Full">Full</button>
                        <button class="manual-override-btn prebed-override-btn" data-tier="Moderate">Moderate</button>
                        <button class="manual-override-btn prebed-override-btn" data-tier="Compressed">Compressed</button>
                        <button class="manual-override-btn prebed-override-btn" data-tier="Emergency">Emergency</button>
                    </div>
                </div>
            </div>
        `;
        
        // Populate inputs
        const selectDay = document.getElementById("input-prebed-day");
        const inputTime = document.getElementById("input-prebed-time");
        
        if (selectDay) selectDay.value = STATE.routineContext.dayOfWeek;
        if (inputTime) inputTime.value = STATE.routineContext.currentTime;
        
        setToggleState("toggle-prebed-workday", STATE.routineContext.workdayTomorrow);
        setEnergyState("group-prebed-energy", STATE.routineContext.energyLevel);
        
        // Event listeners
        if (selectDay) {
            selectDay.onchange = (e) => {
                STATE.routineContext.dayOfWeek = e.target.value;
                const isWeekendTomorrow = (e.target.value === "Friday" || e.target.value === "Saturday");
                STATE.routineContext.workdayTomorrow = !isWeekendTomorrow;
                setToggleState("toggle-prebed-workday", STATE.routineContext.workdayTomorrow);
                updatePreBedRecommendationUI();
            };
        }
        
        if (inputTime) {
            inputTime.onchange = (e) => {
                STATE.routineContext.currentTime = e.target.value;
                updatePreBedRecommendationUI();
            };
        }
        
        // Workday toggles
        const workdayBtns = document.querySelectorAll("#toggle-prebed-workday .toggle-btn");
        workdayBtns.forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.val === "true";
                STATE.routineContext.workdayTomorrow = val;
                setToggleState("toggle-prebed-workday", val);
                updatePreBedRecommendationUI();
            };
        });
        
        // Energy buttons
        const energyBtns = document.querySelectorAll("#group-prebed-energy .energy-btn");
        energyBtns.forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.val;
                STATE.routineContext.energyLevel = val;
                setEnergyState("group-prebed-energy", val);
                updatePreBedRecommendationUI();
            };
        });
        
        // Start button
        const startBtn = document.getElementById("btn-prebed-start");
        if (startBtn) {
            startBtn.onclick = () => {
                const tier = startBtn.dataset.recommendedTier || "Full";
                startRoutine("pre_bed", tier);
            };
        }
        
        // Manual override buttons
        const manualBtns = document.querySelectorAll(".prebed-override-btn");
        manualBtns.forEach(btn => {
            btn.onclick = () => {
                const tier = btn.dataset.tier;
                startRoutine("pre_bed", tier);
            };
        });
        
        updatePreBedRecommendationUI();
    } else {
        // Original selection card layout restoration
        selectionCard.innerHTML = `
            <h2>How are you approaching this routine today?</h2>
            <p class="selection-sub">Select a variant to customize your sequence steps.</p>
            
            <div class="variant-options-list" id="variant-options-container">
                <!-- Loaded dynamically via app.js -->
            </div>
        `;
        
        const optionsContainer = document.getElementById("variant-options-container");
        optionsContainer.innerHTML = "";
        
        Object.keys(routine.variants).forEach(varName => {
            const steps = routine.variants[varName];
            const btn = document.createElement("button");
            btn.className = "variant-option-btn";
            btn.onclick = () => startRoutine(routineKey, varName);
            
            const logo = getVariantLogo(varName);
            const totalMin = getDurationMinutes(steps);
            const durationStr = formatDuration(totalMin);
            
            const now = new Date();
            const finishTime = new Date(now.getTime() + totalMin * 60 * 1000);
            const finishTimeStr = finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            btn.innerHTML = `
                <div class="variant-btn-details">
                    <span class="variant-btn-title">${logo} ${varName}</span>
                    <span class="variant-btn-meta">⏱️ ${durationStr} • Finishes at ${finishTimeStr}</span>
                </div>
                <span class="badge-pill">${steps.length} Steps</span>
            `;
            optionsContainer.appendChild(btn);
        });
    }
    
    showView("variant-selector");
}

// Step 2: Select Variant -> Start Sequencing (Timer starts!)
function startRoutine(routineKey, variantName) {
    const routine = ROUTINES_DB[routineKey];
    
    // BUGFIX: Explicitly reset the active step card classes to prevent it from remaining hidden!
    const card = document.getElementById("active-step-card");
    card.className = "active-step-card";
    
    STATE.activeRoutine = routine;
    STATE.activeVariant = variantName;
    
    let steps;
    if (routineKey === "pre_bed") {
        steps = assemblePreBedSteps(variantName, STATE.routineContext);
    } else {
        steps = [...routine.variants[variantName]];
    }
    
    // Context-driven modifications for Morning Wakeup Routine
    if (routineKey === "wakeup") {
        // 1. Workout Today check
        if (variantName === "Standard" && STATE.routineContext && !STATE.routineContext.workoutToday) {
            // Filter out Grab Gym Bag, Gym Workout, and Gym Hygiene
            steps = steps.filter(s => s.task !== "Grab Gym Bag" && s.task !== "Gym Workout" && s.task !== "Gym Hygiene");
            
            // Find index of Daily Intention to insert right after
            const dailyIntentionIdx = steps.findIndex(s => s.task === "Daily Intention");
            const insertIdx = dailyIntentionIdx !== -1 ? dailyIntentionIdx + 1 : 6;
            
            // Insert Morning Walk and home Hygiene
            steps.splice(insertIdx, 0, 
                { 
                    task: "Morning Walk", 
                    emoji: "🚶", 
                    signifier: "important", 
                    est: "10 min", 
                    notes: "Skip the gym today. Take a quick 10-minute walk outside for light movement and outdoor light.",
                    callout: { 
                        type: "warning", 
                        title: "Gym Skip Rule", 
                        text: "Do not reschedule gym to later the same day. Replace with a walk, reschedule gym to next available slot." 
                    } 
                },
                { 
                    task: "Hygiene", 
                    emoji: "🧴", 
                    signifier: "critical", 
                    est: "8 min", 
                    notes: "Compressed home hygiene: Brush, Sunscreen (non-negotiable), and change clothes" 
                }
            );
        }
        
        // 2. Fajr Sunrise Cutoff check
        if (STATE.routineContext && STATE.routineContext.wakeUpTime) {
            const parts = STATE.routineContext.wakeUpTime.split(':');
            if (parts.length === 2) {
                const hrs = parseInt(parts[0], 10);
                const mins = parseInt(parts[1], 10);
                if (hrs >= 6) {
                    // Sunrise passed, rename and update notes
                    steps = steps.map(s => {
                        if (s.task === "Pray Fajr") {
                            return {
                                ...s,
                                task: "🕌 Pray Fajr (Make-up/Qada)",
                                notes: "Sunrise has passed (~6:00 AM). Establish Fajr prayer as Make-up (Qada) immediately.",
                                signifier: "critical"
                            };
                        }
                        return s;
                    });
                }
            }
        }
    }
    
    STATE.activeSteps = steps;
    STATE.currentStepIndex = 0;
    STATE.completedCount = 0;
    STATE.skippedCount = 0;
    STATE.elapsedSeconds = 0;
    STATE.stepSeconds = 0;
    STATE.stepDurations = [];
    STATE.stepLogs = [];
    STATE.startTime = new Date();
    
    // Setup Top Progress Info
    const logo = getVariantLogo(variantName);
    document.getElementById("sequencer-routine-info").innerText = `${logo} ${routine.title} (${variantName})`;
    
    // Webhook Trigger
    const webhookData = { routine: routine.title, variant: variantName };
    if (routineKey === "wakeup" && STATE.routineContext) {
        webhookData.context = {
            wake_up_time: STATE.routineContext.wakeUpTime,
            workout_today: STATE.routineContext.workoutToday,
            evening_routine_completed_last_night: STATE.routineContext.eveningRoutineCompleted
        };
    }
    fireWebhook("routine_start", webhookData);
    
    // Timer setup
    clearInterval(STATE.timerInterval);
    document.getElementById("sequencer-timer").innerText = "00:00";
    
    // Reset Play/Pause visual states
    STATE.isTimerPaused = false;
    const playIcon = document.getElementById("icon-theme-sun"); // note theme sun holds dark mode theme toggle icon
    const playPauseBtn = document.getElementById("btn-timer-play-pause");
    const dot = document.getElementById("timer-dot");
    
    // Reset Play/Pause visual states properly
    const playTimerIcon = document.getElementById("icon-timer-play");
    const pauseTimerIcon = document.getElementById("icon-timer-pause");
    if (playTimerIcon && pauseTimerIcon && playPauseBtn && dot) {
        playTimerIcon.style.display = "none";
        pauseTimerIcon.style.display = "block";
        playPauseBtn.title = "Pause Timer";
        playPauseBtn.classList.remove("paused-btn");
        dot.classList.remove("paused-dot");
    }

    STATE.timerInterval = setInterval(() => {
        if (STATE.isTimerPaused) return;
        STATE.elapsedSeconds++;
        STATE.stepSeconds++;
        updateTimerDisplays();
    }, 1000);
    
    // Pre-populate steps list in the sidebar
    renderSidebarSteps();
    
    renderActiveStep();
    showView("sequencer");
}

function updateTimerDisplays() {
    // 1. Overall Elapsed Timer
    const mins = Math.floor(STATE.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (STATE.elapsedSeconds % 60).toString().padStart(2, '0');
    document.getElementById("sequencer-timer").innerText = `${mins}:${secs}`;
    
    // 2. Active Step Stopwatch
    const stepTimerEl = document.getElementById("step-timer");
    if (stepTimerEl) {
        const stepMins = Math.floor(STATE.stepSeconds / 60).toString().padStart(2, '0');
        const stepSecs = (STATE.stepSeconds % 60).toString().padStart(2, '0');
        stepTimerEl.innerText = `${stepMins}:${stepSecs}`;
    }
}

// Render Sidebar Steps List
function renderSidebarSteps() {
    const container = document.getElementById("sidebar-steps-container");
    container.innerHTML = "";
    
    // Render the total duration in the sidebar header title
    if (STATE.activeSteps && STATE.activeSteps.length > 0) {
        const totalMin = getDurationMinutes(STATE.activeSteps);
        const durationStr = formatDuration(totalMin);
        const totalTimeEl = document.getElementById("sidebar-total-time");
        if (totalTimeEl) {
            totalTimeEl.innerText = `(${durationStr})`;
        }
    }
    
    STATE.activeSteps.forEach((step, idx) => {
        const item = document.createElement("li");
        item.className = "sidebar-step-item";
        item.id = `sidebar-step-${idx}`;
        item.onclick = () => jumpToStep(idx);
        
        let checkText = "";
        let timeHtml = "";
        
        const log = STATE.stepLogs[idx];
        if (log || idx < STATE.currentStepIndex) {
            // It has been processed (completed or skipped)
            const isCompleted = log ? (log.status === "completed") : (idx < STATE.currentStepIndex);
            if (isCompleted) {
                item.classList.add("completed");
                checkText = "✓";
            } else {
                item.classList.add("skipped");
                checkText = "x";
            }
            
            const actualSeconds = STATE.stepDurations[idx] || 0;
            const estSeconds = parseEstToSeconds(step.est);
            const isOver = actualSeconds > estSeconds;
            const timeClass = isOver ? "time-behind" : "time-ahead";
            const formattedActual = formatActualDuration(actualSeconds);
            
            // Show difference
            const diff = actualSeconds - estSeconds;
            const sign = diff > 0 ? "+" : "";
            const diffStr = diff !== 0 ? ` (${sign}${formatActualDuration(Math.abs(diff))})` : "";
            
            timeHtml = `<span class="step-item-time ${timeClass}">${formattedActual}${diffStr}</span>`;
        } else {
            // Not processed yet
            const estShort = step.est ? step.est.replace(/\s*min/, "m") : "";
            timeHtml = `<span class="step-item-time estimate">${estShort}</span>`;
        }
        
        if (idx === STATE.currentStepIndex) {
            item.classList.add("active");
        }
        
        item.innerHTML = `
            <div class="sidebar-step-dot ${step.signifier}"></div>
            <span class="step-item-text">${step.task}</span>
            ${timeHtml}
            <span class="sidebar-step-check ${log ? log.status : ''}">${checkText}</span>
        `;
        container.appendChild(item);
    });
}

// Jump to a specific step from sidebar click
function jumpToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= STATE.activeSteps.length) return;
    
    // Save duration of the step we are leaving immediately
    STATE.stepDurations[STATE.currentStepIndex] = STATE.stepSeconds;
    STATE.stepSeconds = 0;
    updateTimerDisplays();
    
    const card = document.getElementById("active-step-card");
    
    // Slide out left animation
    card.classList.add("slide-out-left");
    
    setTimeout(() => {
        STATE.currentStepIndex = stepIndex;
        card.className = "active-step-card slide-in-right";
        
        renderActiveStep();
        
        setTimeout(() => {
            card.classList.remove("slide-in-right");
        }, 50);
    }, 200);
    
    // On mobile, close sidebar automatically
    if (window.innerWidth <= 768) {
        document.getElementById("sequencer-sidebar").classList.remove("active");
    }
}

// Step 3: Render Current Step in Sequencer
function renderActiveStep() {
    const step = STATE.activeSteps[STATE.currentStepIndex];
    const nSteps = STATE.activeSteps.length;
    
    // Update Counter
    document.getElementById("sequencer-step-counter").innerText = `Step ${STATE.currentStepIndex + 1} of ${nSteps}`;
    
    // Update Progress Bar
    const progressPerc = ((STATE.currentStepIndex) / nSteps) * 100;
    document.getElementById("sequencer-progress-fill").style.width = `${progressPerc}%`;
    
    // Render Step Card elements
    const sigBadge = document.getElementById("step-signifier");
    sigBadge.innerText = step.signifier;
    sigBadge.className = `signifier-badge ${step.signifier}`;
    
    // Dynamically apply signifier glowing card classes
    const card = document.getElementById("active-step-card");
    card.classList.remove("critical-card", "important-card", "optional-card");
    card.classList.add(`${step.signifier}-card`);
    
    document.getElementById("step-est-time").innerText = `⏱️ ${step.est || "—"}`;
    document.getElementById("step-task-name").innerText = step.task;
    document.getElementById("step-notes-text").innerText = step.notes || "";
    
    const emojiEl = document.getElementById("step-emoji");
    if (emojiEl) {
        emojiEl.innerText = step.emoji || "✨";
    }
    
    // Render callout block if present
    const calloutBlock = document.getElementById("step-callout-card");
    if (step.callout) {
        document.getElementById("step-callout-emoji").innerText = step.callout.type === "warning" ? "⚠️" : "💡";
        document.getElementById("step-callout-title").innerText = step.callout.title;
        document.getElementById("step-callout-text").innerText = step.callout.text;
        calloutBlock.style.display = "flex";
    } else {
        calloutBlock.style.display = "none";
    }
    
    // Update active highlight classes and scroll in sidebar list
    renderSidebarSteps();
    const activeItem = document.getElementById(`sidebar-step-${STATE.currentStepIndex}`);
    if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Disable/enable Back button based on index position
    const prevBtn = document.getElementById("btn-prev-step");
    if (prevBtn) {
        prevBtn.disabled = (STATE.currentStepIndex === 0);
        prevBtn.style.opacity = (STATE.currentStepIndex === 0) ? "0.3" : "1";
    }
    
    // Update displays instantly
    updateTimerDisplays();
    
    // Raise local notification
    sendLocalNotification(`Routine Action: ${step.task}`, step.notes || "");
}

// Satisfaction-focused next step transitions
function advanceStep(isCompleted) {
    // Save duration of the step we are leaving immediately
    STATE.stepDurations[STATE.currentStepIndex] = STATE.stepSeconds;
    STATE.stepSeconds = 0;
    updateTimerDisplays();
    
    const card = document.getElementById("active-step-card");
    
    // Add slide out animation
    card.classList.add("slide-out-left");
    
    setTimeout(() => {
        // Record log or update existing log at this index
        const step = STATE.activeSteps[STATE.currentStepIndex];
        const logEntry = {
            task: `${step.emoji ? step.emoji + " " : ""}${step.task}`,
            status: isCompleted ? "completed" : "skipped",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        STATE.stepLogs[STATE.currentStepIndex] = logEntry;
        
        if (isCompleted) {
            STATE.completedCount++;
            AUDIO.playStepChime();
        } else {
            STATE.skippedCount++;
        }
        
        STATE.currentStepIndex++;
        
        if (STATE.currentStepIndex < STATE.activeSteps.length) {
            // Setup card on the right
            card.classList.remove("slide-out-left");
            card.classList.add("slide-in-right");
            
            renderActiveStep();
            
            // Slide card back in
            setTimeout(() => {
                card.classList.remove("slide-in-right");
            }, 50);
        } else {
            // Routine Finished!
            finishRoutine();
        }
    }, 250);
}

// Back to previous step
function prevStep() {
    if (STATE.currentStepIndex <= 0) return;
    
    // Save duration of the step we are leaving immediately
    STATE.stepDurations[STATE.currentStepIndex] = STATE.stepSeconds;
    STATE.stepSeconds = 0;
    updateTimerDisplays();
    
    const card = document.getElementById("active-step-card");
    
    // Slide card out to the right (going backward)
    card.classList.add("slide-in-right");
    
    setTimeout(() => {
        STATE.currentStepIndex--;
        
        // Reset card to left to slide back rightwards
        card.className = "active-step-card slide-out-left";
        
        renderActiveStep();
        
        setTimeout(() => {
            card.classList.remove("slide-out-left");
        }, 50);
    }, 200);
}

// Complete Routine execution
function finishRoutine() {
    clearInterval(STATE.timerInterval);
    AUDIO.playCompleteChime();
    
    const minutesElapsed = Math.ceil(STATE.elapsedSeconds / 60);
    const nSteps = STATE.activeSteps.length;
    
    // Update completion screen stats
    document.getElementById("completion-summary-text").innerText = `You completed ${STATE.activeRoutine.title} (${STATE.activeVariant})`;
    document.getElementById("completed-stat-time").innerText = `${minutesElapsed}m`;
    document.getElementById("completed-stat-steps").innerText = `${STATE.completedCount} / ${nSteps}`;
    
    // Pace Delta calculation
    const totalEstSeconds = getCumulativeEstimateSeconds(nSteps);
    const finalDelta = STATE.elapsedSeconds - totalEstSeconds;
    const finalDeltaMin = Math.round(Math.abs(finalDelta) / 60);
    
    const deltaValEl = document.getElementById("completed-stat-delta");
    const deltaLabelEl = document.getElementById("completed-stat-delta-label");
    
    if (deltaValEl && deltaLabelEl) {
        if (finalDeltaMin > 0 && finalDelta > 0) {
            deltaValEl.innerText = `+${finalDeltaMin}m`;
            deltaValEl.style.color = "#ef4444"; // Red for behind
            deltaLabelEl.innerText = "Behind Schedule";
        } else if (finalDeltaMin > 0 && finalDelta < 0) {
            deltaValEl.innerText = `-${finalDeltaMin}m`;
            deltaValEl.style.color = "#10b981"; // Green for ahead
            deltaLabelEl.innerText = "Ahead of Schedule";
        } else {
            deltaValEl.innerText = "On Time";
            deltaValEl.style.color = "var(--text-secondary)";
            deltaLabelEl.innerText = "Schedule Delta";
        }
    }
    
    // Generate Tana Paste formatted content
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const nowTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const tanaRoutineNodeId = TANA_ROUTINE_IDS[STATE.activeRoutine.id] || "";
    
    let tanaPaste = `- ${STATE.activeRoutine.title} #[[^vU_IN3DitljW]]\n`;
    tanaPaste += `  - [[^SYS_A90]]:: [[date:${dateStr} ${timeStr}]]\n`;
    if (tanaRoutineNodeId) {
        tanaPaste += `  - [[^-xABNDlB6jJG]]:: [[^${tanaRoutineNodeId}]]\n`;
    } else {
        tanaPaste += `  - [[^-xABNDlB6jJG]]:: [[${STATE.activeRoutine.title} #routine]]\n`;
    }
    
    if (STATE.activeRoutine.id === "wakeup" && STATE.routineContext) {
        tanaPaste += `  - Wake Up Time:: ${STATE.routineContext.wakeUpTime}\n`;
        tanaPaste += `  - Workout Today:: ${STATE.routineContext.workoutToday ? "Yes" : "No"}\n`;
        tanaPaste += `  - Evening Routine Completed:: ${STATE.routineContext.eveningRoutineCompleted ? "Yes" : "No"}\n`;
        tanaPaste += `  - Recommended Variant:: ${STATE.activeVariant}\n`;
    }
    
    STATE.activeSteps.forEach((step, idx) => {
        const log = STATE.stepLogs[idx];
        if (log && log.status === "completed") {
            tanaPaste += `  - ${step.task}\n`;
        }
    });
    
    document.getElementById("tana-paste-output").innerText = tanaPaste.trim();
    
    // Persist completion state in localStorage and write Obsidian Logs
    saveCompletionLog(STATE.activeRoutine.id, STATE.activeVariant, STATE.completedCount, nSteps, tanaPaste);
    
    // Webhook Trigger
    const webhookCompleteData = {
        routine: STATE.activeRoutine.title,
        variant: STATE.activeVariant,
        duration_minutes: minutesElapsed,
        completed_steps: STATE.completedCount,
        total_steps: nSteps
    };
    if (STATE.activeRoutine.id === "wakeup" && STATE.routineContext) {
        webhookCompleteData.context = {
            wake_up_time: STATE.routineContext.wakeUpTime,
            workout_today: STATE.routineContext.workoutToday,
            evening_routine_completed_last_night: STATE.routineContext.eveningRoutineCompleted
        };
    }
    fireWebhook("routine_complete", webhookCompleteData);
    
    // Tana Sync Trigger
    if (STATE.settings.tanaToken) {
        pushToTanaAPI();
    } else {
        const syncStatusEl = document.getElementById("tana-sync-status");
        if (syncStatusEl) {
            syncStatusEl.innerText = "READY";
            syncStatusEl.className = "status-indicator ready";
        }
    }
    
    showView("complete");
}

async function pushToTanaAPI() {
    const syncStatusEl = document.getElementById("tana-sync-status");
    if (syncStatusEl) {
        syncStatusEl.innerText = "SYNCING...";
        syncStatusEl.className = "status-indicator syncing";
    }
    
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetNodeId = STATE.settings.tanaTargetNodeId || "INBOX";
    
    if (targetNodeId.toUpperCase() === "TODAY" || targetNodeId.toUpperCase() === "DAILY_NODE") {
        // Route through local webhook proxy
        let webhookBaseUrl = "http://localhost:8080";
        if (STATE.settings.webhookUrl) {
            try {
                webhookBaseUrl = new URL(STATE.settings.webhookUrl).origin;
            } catch (urlErr) {
                console.warn("[Tana Sync] Failed to parse webhookUrl, using default", urlErr);
            }
        }
        const proxyUrl = `${webhookBaseUrl}/api/tana/push`;
        
        const headers = {
            "Content-Type": "application/json"
        };
        if (STATE.settings.webhookToken) {
            headers["Authorization"] = `Bearer ${STATE.settings.webhookToken}`;
        }
        
        const tanaPasteContent = document.getElementById("tana-paste-output").innerText;
        const proxyPayload = {
            tanaToken: STATE.settings.tanaToken,
            content: tanaPasteContent
        };
        
        try {
            console.log(`[Tana Sync] Routing push to today's daily note via proxy: ${proxyUrl}`);
            const response = await fetch(proxyUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(proxyPayload),
                mode: "cors"
            });
            
            if (response.ok) {
                if (response.status === 202) {
                    console.log("[Tana Sync] Direct connection failed, routine has been queued locally.");
                    if (syncStatusEl) {
                        syncStatusEl.innerText = "QUEUED";
                        syncStatusEl.className = "status-indicator queued";
                    }
                    showToast("Tana offline. Completed routine queued for sync!");
                } else {
                    console.log("[Tana Sync] Successfully pushed routine to today's Daily Note via proxy.");
                    if (syncStatusEl) {
                        syncStatusEl.innerText = "SYNCED";
                        syncStatusEl.className = "status-indicator ready";
                    }
                    showToast("Synced to Today's Daily Note!");
                }
            } else {
                const errData = await response.json().catch(() => ({}));
                const errMsg = errData.message || `Status: ${response.status}`;
                console.warn(`[Tana Sync] Proxy push failed. ${errMsg}`);
                if (syncStatusEl) {
                    syncStatusEl.innerText = "FAILED";
                    syncStatusEl.className = "status-indicator failed";
                }
                showToast(`Tana push failed: ${errMsg}`);
            }
        } catch (err) {
            console.error("[Tana Sync] Error pushing to Tana via proxy:", err);
            if (syncStatusEl) {
                syncStatusEl.innerText = "FAILED";
                syncStatusEl.className = "status-indicator failed";
            }
            showToast("Tana API Sync failed (Proxy connection error)");
        }
        return;
    }
    
    // Construct Tana Nodes Payload (Image 2 style)
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const tanaRoutineNodeId = TANA_ROUTINE_IDS[STATE.activeRoutine.id] || "";

    const children = [
        {
            type: "field",
            attributeId: "SYS_A90",
            children: [
                {
                    dataType: "date",
                    name: `${dateStr} ${timeStr}:00`
                }
            ]
        }
    ];

    if (tanaRoutineNodeId) {
        children.push({
            type: "field",
            attributeId: "-xABNDlB6jJG",
            children: [
                {
                    dataType: "reference",
                    id: tanaRoutineNodeId
                }
            ]
        });
    }

    STATE.activeSteps.forEach((step, idx) => {
        const log = STATE.stepLogs[idx];
        if (log && log.status === "completed") {
            children.push({
                name: step.task
            });
        }
    });

    const nodes = [
        {
            name: STATE.activeRoutine.title,
            supertags: [
                {
                    id: "vU_IN3DitljW"
                }
            ],
            children: children
        }
    ];
    
    const payload = {
        targetNodeId: targetNodeId,
        nodes: nodes
    };
    
    try {
        console.log(`[Tana Sync] Pushing payload to Tana API under node ID: ${targetNodeId}`);
        const response = await fetch("https://core.tana.inc/production/api/push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${STATE.settings.tanaToken}`
            },
            body: JSON.stringify(payload),
            mode: "cors"
        });
        
        if (response.ok) {
            console.log("[Tana Sync] Successfully pushed routine to Tana.");
            if (syncStatusEl) {
                syncStatusEl.innerText = "SYNCED";
                syncStatusEl.className = "status-indicator ready";
            }
            showToast("Synced to Tana Inbox!");
        } else {
            console.warn(`[Tana Sync] Push failed. Status: ${response.status}`);
            if (syncStatusEl) {
                syncStatusEl.innerText = "FAILED";
                syncStatusEl.className = "status-indicator failed";
            }
            showToast(`Tana push failed: HTTP ${response.status}`);
        }
    } catch (err) {
        console.error("[Tana Sync] Error pushing to Tana:", err);
        if (syncStatusEl) {
            syncStatusEl.innerText = "FAILED";
            syncStatusEl.className = "status-indicator failed";
        }
        showToast("Tana API Sync failed (CORS/Network error)");
    }
}

// 4. Persistence & Local Storage Caching
function saveCompletionLog(routineId, variant, completed, total, rawPaste) {
    // 1. Save in local browser storage
    const logs = JSON.parse(localStorage.getItem("routine_history") || "[]");
    const newLog = {
        routineId: routineId,
        variant: variant,
        completed: completed,
        total: total,
        timestamp: new Date().toISOString(),
        duration_seconds: STATE.elapsedSeconds
    };
    logs.push(newLog);
    localStorage.setItem("routine_history", JSON.stringify(logs));
    
    // 2. Save inside LocalStorage under a unique synced key
    localStorage.setItem("routine_app_bridge_state", JSON.stringify({
        last_updated: new Date().toISOString(),
        active_routine: routineId,
        active_variant: variant,
        completed: true,
        steps: STATE.stepLogs
    }));
}

// Copy Tana Paste block to clipboard
function copyTanaPaste() {
    const copyText = document.getElementById("tana-paste-output").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        const copyBtn = document.getElementById("btn-copy-tana");
        copyBtn.innerText = "Copied Outline!";
        copyBtn.classList.add("copied");
        showToast("Tana Paste copied to clipboard!");
        
        setTimeout(() => {
            copyBtn.innerText = "Copy to Clipboard";
            copyBtn.classList.remove("copied");
        }, 2000);
    });
}

// Show Toast Alert Notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// 5. Settings Modal Functions
function openSettings() {
    document.getElementById("setting-webhook").value = STATE.settings.webhookUrl;
    document.getElementById("setting-token").value = STATE.settings.webhookToken;
    document.getElementById("setting-tana-token").value = STATE.settings.tanaToken || "";
    document.getElementById("setting-tana-node").value = STATE.settings.tanaTargetNodeId || "INBOX";
    document.getElementById("setting-sound").checked = STATE.settings.soundEnabled;
    document.getElementById("setting-notifications").checked = STATE.settings.notificationsEnabled;
    
    document.getElementById("modal-settings").classList.add("active");
}

function closeSettings() {
    document.getElementById("modal-settings").classList.remove("active");
}

function saveSettings() {
    STATE.settings.webhookUrl = document.getElementById("setting-webhook").value;
    STATE.settings.webhookToken = document.getElementById("setting-token").value;
    STATE.settings.tanaToken = document.getElementById("setting-tana-token").value.trim();
    STATE.settings.tanaTargetNodeId = document.getElementById("setting-tana-node").value.trim() || "INBOX";
    STATE.settings.soundEnabled = document.getElementById("setting-sound").checked;
    STATE.settings.notificationsEnabled = document.getElementById("setting-notifications").checked;
    
    localStorage.setItem("routine_app_settings", JSON.stringify(STATE.settings));
    
    if (STATE.settings.notificationsEnabled) {
        requestNotificationPermission();
    }
    
    closeSettings();
    showToast("Settings saved successfully!");
}

function resetLocalCache() {
    if (confirm("Are you sure you want to clear your local application settings and execution history?")) {
        localStorage.clear();
        STATE.settings = {
            webhookUrl: "http://localhost:8080/api/routine/trigger",
            webhookToken: "",
            tanaToken: "",
            tanaTargetNodeId: "INBOX",
            soundEnabled: true,
            notificationsEnabled: false,
            theme: "dark"
        };
        applyTheme();
        closeSettings();
        showToast("Application cache reset.");
        renderDashboard();
    }
}

// Load persisted configurations on startup
function loadSettings() {
    const saved = localStorage.getItem("routine_app_settings");
    if (saved) {
        try {
            STATE.settings = { ...STATE.settings, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Error loading persisted settings:", e);
        }
    }
    applyTheme();
}

// Theme Control Actions
function toggleTheme() {
    STATE.settings.theme = STATE.settings.theme === "dark" ? "light" : "dark";
    applyTheme();
    localStorage.setItem("routine_app_settings", JSON.stringify(STATE.settings));
}

function applyTheme() {
    const isLight = STATE.settings.theme === "light";
    const sunIcon = document.getElementById("icon-theme-sun");
    const moonIcon = document.getElementById("icon-theme-moon");
    
    if (isLight) {
        document.body.classList.add("light-theme");
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "block";
    } else {
        document.body.classList.remove("light-theme");
        if (sunIcon) sunIcon.style.display = "block";
        if (moonIcon) moonIcon.style.display = "none";
    }
}

// Timer Control Actions
function toggleTimer() {
    STATE.isTimerPaused = !STATE.isTimerPaused;
    
    const playIcon = document.getElementById("icon-timer-play");
    const pauseIcon = document.getElementById("icon-timer-pause");
    const playPauseBtn = document.getElementById("btn-timer-play-pause");
    const dot = document.getElementById("timer-dot");
    
    if (STATE.isTimerPaused) {
        if (playIcon) playIcon.style.display = "block";
        if (pauseIcon) pauseIcon.style.display = "none";
        if (playPauseBtn) {
            playPauseBtn.title = "Resume Timer";
            playPauseBtn.classList.add("paused-btn");
        }
        if (dot) dot.classList.add("paused-dot");
        showToast("Timer paused");
    } else {
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "block";
        if (playPauseBtn) {
            playPauseBtn.title = "Pause Timer";
            playPauseBtn.classList.remove("paused-btn");
        }
        if (dot) dot.classList.remove("paused-dot");
        showToast("Timer resumed");
    }
}

function resetTimer() {
    STATE.elapsedSeconds = 0;
    document.getElementById("sequencer-timer").innerText = "00:00";
    showToast("Timer reset");
    
    // Auto-resume if paused when resetting
    if (STATE.isTimerPaused) {
        toggleTimer();
    }
}

function exitRoutine() {
    if (confirm("Are you sure you want to exit this routine and return to the dashboard? Your progress will not be logged.")) {
        clearInterval(STATE.timerInterval);
        STATE.activeRoutine = null;
        STATE.activeVariant = null;
        STATE.activeSteps = [];
        STATE.currentStepIndex = 0;
        STATE.elapsedSeconds = 0;
        
        // Hide sidebar if open
        document.getElementById("sequencer-sidebar").classList.remove("active");
        
        renderDashboard();
        showView("dashboard");
        showToast("Routine exited");
    }
}

// 6. Application Launch & Routing Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Load Settings
    loadSettings();
    
    // Core Event Handlers
    document.getElementById("btn-back-to-dash").onclick = () => showView("dashboard");
    document.getElementById("btn-prev-step").onclick = prevStep;
    document.getElementById("btn-skip-step").onclick = () => advanceStep(false);
    document.getElementById("btn-complete-step").onclick = () => advanceStep(true);
    document.getElementById("btn-completion-finish").onclick = () => {
        renderDashboard();
        showView("dashboard");
    };
    
    document.getElementById("btn-exit-routine").onclick = exitRoutine;
    
    document.getElementById("btn-copy-tana").onclick = copyTanaPaste;
    
    // Timer controls
    document.getElementById("btn-timer-play-pause").onclick = toggleTimer;
    document.getElementById("btn-timer-reset").onclick = resetTimer;
    
    // Sidebar Drawer controls
    const sidebar = document.getElementById("sequencer-sidebar");
    document.getElementById("btn-toggle-sidebar").onclick = () => {
        sidebar.classList.toggle("active");
    };
    document.getElementById("btn-close-sidebar").onclick = () => {
        sidebar.classList.remove("active");
    };
    
    // Theme toggle
    document.getElementById("btn-theme-toggle").onclick = toggleTheme;
    
    // Settings Modal Listeners
    document.getElementById("btn-settings").onclick = openSettings;
    document.getElementById("btn-close-settings").onclick = closeSettings;
    document.getElementById("btn-save-settings").onclick = saveSettings;
    document.getElementById("btn-clear-cache").onclick = resetLocalCache;
    
    // Close modal on clicking outside card
    document.getElementById("modal-settings").onclick = (e) => {
        if (e.target.id === "modal-settings") closeSettings();
    };
    
    // Initialize Dashboard
    renderDashboard();
    
    // Initialize Prayer & Sleep Widget
    initPrayerWidget();
});

// Verification Test Suite for Context-Driven Routine Recommendation
window.runAdaptationTests = function() {
    console.log("=== RUNNING CONTEXT ADAPTATION TESTS ===");
    
    // Helper to log test outcomes
    let passCount = 0;
    let failCount = 0;
    
    function assertEqual(actual, expected, message) {
        if (actual === expected) {
            console.log(`%c[PASS] ${message}`, "color: #10b981; font-weight: bold;");
            passCount++;
        } else {
            console.error(`[FAIL] ${message} - Expected: "${expected}", Actual: "${actual}"`);
            failCount++;
        }
    }

    // Save current context to restore later
    const originalContext = { ...STATE.routineContext };
    
    try {
        // Test Case 1: Weekend override (Saturday)
        STATE.routineContext = {
            dayOfWeek: "Saturday",
            wakeUpTime: "06:30",
            workoutToday: false,
            eveningRoutineCompleted: true
        };
        assertEqual(getRecommendedVariant().variant, "Weekend", "Saturday recommends Weekend variant");
        
        // Test Case 2: Weekend override (Sunday)
        STATE.routineContext = {
            dayOfWeek: "Sunday",
            wakeUpTime: "08:30",
            workoutToday: false,
            eveningRoutineCompleted: false
        };
        assertEqual(getRecommendedVariant().variant, "Weekend", "Sunday recommends Weekend variant despite late wake and incomplete evening");

        // Test Case 3: Weekday standard morning
        STATE.routineContext = {
            dayOfWeek: "Tuesday",
            wakeUpTime: "06:30",
            workoutToday: true,
            eveningRoutineCompleted: true
        };
        assertEqual(getRecommendedVariant().variant, "Standard", "Tuesday standard wake recommends Standard variant");

        // Test Case 4: Weekday late wakeup (>7:30 AM)
        STATE.routineContext = {
            dayOfWeek: "Wednesday",
            wakeUpTime: "07:45",
            workoutToday: true,
            eveningRoutineCompleted: true
        };
        assertEqual(getRecommendedVariant().variant, "Low Energy", "Wednesday late wake (07:45) recommends Low Energy variant");

        // Test Case 5: Weekday incomplete evening routine
        STATE.routineContext = {
            dayOfWeek: "Thursday",
            wakeUpTime: "06:15",
            workoutToday: true,
            eveningRoutineCompleted: false
        };
        assertEqual(getRecommendedVariant().variant, "Low Energy", "Thursday incomplete evening routine recommends Low Energy variant");

        // Test Case 6: Weekday exact Fajr Sunrise Cutoff boundary (06:00 AM)
        STATE.routineContext = {
            dayOfWeek: "Friday",
            wakeUpTime: "06:00",
            workoutToday: true,
            eveningRoutineCompleted: true
        };
        assertEqual(getRecommendedVariant().variant, "Standard", "Friday exactly 06:00 AM recommends Standard variant");

        console.log(`=== TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===`);
    } finally {
        // Restore context
        STATE.routineContext = originalContext;
    }
};

// Verification Test Suite for Pre-Bed dynamic adaptation
window.runPreBedTests = function() {
    console.log("=== RUNNING PRE-BED CONTEXT ADAPTATION TESTS ===");
    let passCount = 0;
    let failCount = 0;
    
    function assertEqual(actual, expected, message) {
        if (actual === expected) {
            console.log(`%c[PASS] ${message}`, "color: #10b981; font-weight: bold;");
            passCount++;
        } else {
            console.error(`[FAIL] ${message} - Expected: "${expected}", Actual: "${actual}"`);
            failCount++;
        }
    }
    
    const originalContext = { ...STATE.routineContext };
    const originalSleepTargets = STATE.sleepTargets ? { ...STATE.sleepTargets } : null;
    
    try {
        // Mock target bedtime: 22:00 (10:00 PM)
        STATE.sleepTargets = {
            targetBedtime: "22:00",
            latestWakeUp: "06:00"
        };
        
        // Helper to construct a specific date and time on a Monday
        function getMockDate(timeStr) {
            const date = new Date("2026-06-15T00:00:00"); // A Monday
            const [hrs, mins] = timeStr.split(':').map(Number);
            date.setHours(hrs, mins, 0, 0);
            return date;
        }

        // Test Case 1: Time Budget >= 60 min (Full tier)
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "20:00",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        assertEqual(
            getPreBedRecommendation(getMockDate("20:00")).tier,
            "Full",
            "8:00 PM recommends Full tier (120m budget)"
        );

        // Test Case 2: Time Budget between 30 and 59 min (Moderate tier)
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "21:15",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        assertEqual(
            getPreBedRecommendation(getMockDate("21:15")).tier,
            "Moderate",
            "9:15 PM recommends Moderate tier (45m budget)"
        );

        // Test Case 3: Time Budget between 15 and 29 min (Compressed tier)
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "21:40",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        assertEqual(
            getPreBedRecommendation(getMockDate("21:40")).tier,
            "Compressed",
            "9:40 PM recommends Compressed tier (20m budget)"
        );

        // Test Case 4: Time Budget < 15 min (Emergency tier)
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "21:50",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        assertEqual(
            getPreBedRecommendation(getMockDate("21:50")).tier,
            "Emergency",
            "9:50 PM recommends Emergency tier (10m budget)"
        );

        // Test Case 5: Midnight boundary (current time 12:12 AM, target bedtime 10:00 PM yesterday)
        // If current time is 12:12 AM on Tuesday (June 16), target bedtime was 10:00 PM on Monday (June 15).
        // Since current time is after bedtime, it should recommend Emergency.
        const mockTuesdayMidnight = new Date("2026-06-16T00:12:00");
        STATE.routineContext = {
            dayOfWeek: "Tuesday",
            currentTime: "00:12",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        assertEqual(
            getPreBedRecommendation(mockTuesdayMidnight).tier,
            "Emergency",
            "12:12 AM recommends Emergency tier (bedtime was 10:00 PM yesterday)"
        );

        // Test Case 6: Energy Level Exhausted (downgrade Moderate -> Compressed)
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "21:15",
            workdayTomorrow: true,
            energyLevel: "Exhausted"
        };
        assertEqual(
            getPreBedRecommendation(getMockDate("21:15")).tier,
            "Compressed",
            "9:15 PM with Exhausted energy downscales Moderate to Compressed"
        );

        // Test Case 7: Steps Assembly - Workday vs Weekend tomorrow
        // Workday tomorrow -> includes Stage Commute Gear and Set Wake Alarm
        STATE.routineContext = {
            dayOfWeek: "Monday",
            currentTime: "20:00",
            workdayTomorrow: true,
            energyLevel: "Normal"
        };
        const workdaySteps = assemblePreBedSteps("Full", STATE.routineContext);
        const hasCommuteGear = workdaySteps.some(s => s.task === "Stage Commute Gear");
        assertEqual(hasCommuteGear, true, "Workday context includes Stage Commute Gear");

        // Weekend tomorrow (Friday night) -> does not include Stage Commute Gear
        STATE.routineContext = {
            dayOfWeek: "Friday",
            currentTime: "20:00",
            workdayTomorrow: false,
            energyLevel: "Normal"
        };
        const weekendSteps = assemblePreBedSteps("Full", STATE.routineContext);
        const hasCommuteGearWeekend = weekendSteps.some(s => s.task === "Stage Commute Gear");
        assertEqual(hasCommuteGearWeekend, false, "Weekend context excludes Stage Commute Gear");

        console.log(`=== PRE-BED TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===`);
    } finally {
        STATE.routineContext = originalContext;
        STATE.sleepTargets = originalSleepTargets;
    }
};

