/* ==========================================================================
   Nexus Routine App - Core State Engine & Personal Routine Database
   ========================================================================== */

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
                { task: "Meditate", emoji: "🧘", signifier: "important", est: "5 min", notes: "Perform physiological sighing or a short sit for a nervous system reset" },
                { task: "Daily Intention", emoji: "🎯", signifier: "important", est: "3 min", notes: "Open Obsidian Daily Note and write: 'What ONE thing makes today a win?' — before opening other apps" },
                { task: "Grab Gym Bag", emoji: "🎒", signifier: "critical", est: "2 min", notes: "Grab your pre-packed gym bag (packed the night before)" },
                { task: "Gym Workout", emoji: "🏋️", signifier: "important", est: "45-60 min", notes: "45–60 min hypertrophy and longevity training. Log name, weight, and sets x reps.", callout: { type: "tip", title: "Training Log", text: "After each exercise: log details. Goal: 'Did I do more than last time?' Track it to make it training, not just exercise!" } },
                { task: "Sunlight Exposure", emoji: "☀️", signifier: "important", est: "10 min", notes: "Get direct outdoor light during your commute. Walk or park farther away.", callout: { type: "tip", title: "Sunlight Calibration", text: "Get sunlight within 30-60 min of waking. Outdoors only — sunlight through window glass doesn't count." } },
                { task: "Gym Hygiene", emoji: "🚿", signifier: "critical", est: "15 min", notes: "Complete your hygiene routine (Shower, Brush, Sunscreen, Deo) and change clothes at the gym" },
                { task: "Commute to Work", emoji: "🚗", signifier: "critical", est: "15 min", notes: "Leave for work by 8:30 AM" }
            ],
            "Low Energy / Late": [
                { task: "Wake Up", emoji: "🌅", signifier: "critical", est: "2 min", notes: "Downshift expectations today and wake up gently" },
                { task: "Bathroom & Wudu", emoji: "💧", signifier: "critical", est: "5 min", notes: "Perform wudu required for morning prayer" },
                { task: "Pray Fajr", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Spiritual connection (make up qada immediately if missed)" },
                { task: "Hydrate", emoji: "🥛", signifier: "critical", est: "2 min", notes: "Drink fresh water to replenish fluids" },
                { task: "Mental Intention", emoji: "🧠", signifier: "important", est: "1 min", notes: "Mentally answer your ONE thing intention for the day — no writing required" },
                { task: "Morning Walk", emoji: "🚶", signifier: "important", est: "10 min", notes: "Skip the gym today. Take a quick 10-minute walk outside for light movement and outdoor light.", callout: { type: "warning", title: "Gym Skip Rule", text: "Do not reschedule gym to later the same day. Replace with a walk, reschedule gym to next available slot." } },
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
            ],
            "Poor Sleep / Zain Wake": [
                { task: "Wake Up", emoji: "🥱", signifier: "critical", est: "2 min", notes: "Sleep was disrupted by Zain or active nights — wake up gently" },
                { task: "Bathroom & Wudu", emoji: "💧", signifier: "critical", est: "5 min", notes: "Perform wudu required for prayer" },
                { task: "Pray Fajr", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Spiritual connection (make up immediately if late)" },
                { task: "Hydrate", emoji: "🥛", signifier: "critical", est: "2 min", notes: "Drink extra water to combat fatigue" },
                { task: "Mental Intention", emoji: "🧠", signifier: "important", est: "1 min", notes: "Orient your mind with a quick mental answer — no writing" },
                { task: "Light Walk", emoji: "🚶", signifier: "important", est: "10 min", notes: "Skip heavy lifting today. Perform a light 10-minute walk outside for light exposure." },
                { task: "Deep Rest Protocol", emoji: "💤", signifier: "important", est: "10 min", notes: "Run a 10-minute Non-Sleep Deep Rest (NSDR) session to restore cognitive function.", callout: { type: "tip", title: "NSDR Focus", text: "10 min of NSDR can recover cognitive function after a severely broken night of sleep." } },
                { task: "Hygiene", emoji: "🧴", signifier: "critical", est: "8 min", notes: "Compressed home hygiene: Brush, Sunscreen, and clothes" }
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
            "Standard": [
                { task: "Warm Shower", emoji: "🚿", signifier: "critical", est: "15 min", notes: "Take a warm shower for thermal cooling (sleep signal) and spiritual cleanliness" },
                { task: "Pray Isha", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Establish Isha prayer — spiritual close (non-negotiable)" },
                { task: "Quick Declutter", emoji: "🧹", signifier: "important", est: "10 min", notes: "Set a 10-minute timer to declutter high-visibility areas and kitchen counters.", callout: { type: "tip", title: "Quick Declutter", text: "Set a timer, stop when it goes off. High-visibility areas only: kitchen counter, living room, bedroom floor, bag staged by the door." } },
                { task: "Vitamins & Supplements", emoji: "💊", signifier: "critical", est: "2 min", notes: "Take your evening vitamins and fish oil supplements" },
                { task: "Oral Hygiene", emoji: "🪥", signifier: "critical", est: "5 min", notes: "Perform complete oral hygiene (Brush, Floss, Salt Gargle)" },
                { task: "Evening Skincare", emoji: "🧴", signifier: "important", est: "5 min", notes: "Cleanse, moisturize, and apply active skincare" },
                { task: "Stage Commute Gear", emoji: "🎒", signifier: "critical", est: "10 min", notes: "Pack your work bag, stage lunch, and fill water bottle to enable tomorrow's morning.", callout: { type: "warning", title: "Staging Bag", text: "Skipping bag packing means 5–10 extra minutes lost in the morning rush." } },
                { task: "Charge Devices", emoji: "🔌", signifier: "critical", est: "2 min", notes: "Plug in phone and watch (charge phone away from bed if possible)" },
                { task: "Gentle Stretching", emoji: "🧘", signifier: "important", est: "8 min", notes: "Perform gentle Yin yoga stretching for neck and shoulder release" },
                { task: "Yoga Nidra Sleep", emoji: "💤", signifier: "important", est: "15 min", notes: "Run a Yoga Nidra or NSDR session to trigger deeply restorative sleep" }
            ],
            "Late Night / Exhausted": [
                { task: "Quick Shower", emoji: "🚿", signifier: "important", est: "5 min", notes: "Take a quick 5-minute warm shower (skip if Faraz Gosul is not due)" },
                { task: "Pray Isha", emoji: "🕌", signifier: "critical", est: "10 min", notes: "Establish Isha prayer — spiritual close" },
                { task: "Vitamins & Supplements", emoji: "💊", signifier: "critical", est: "2 min", notes: "Take your evening vitamins and fish oil supplements" },
                { task: "Essential Oral Care", emoji: "🪥", signifier: "critical", est: "4 min", notes: "Brush and floss teeth" },
                { task: "Set Tomorrow Clothes", emoji: "👕", signifier: "important", est: "2 min", notes: "Set out tomorrow's clothes at minimum (2-minute prep)" },
                { task: "Charge Phone", emoji: "🔌", signifier: "critical", est: "1 min", notes: "Plug in phone and head to sleep" }
            ],
            "Workday Next Morning": [
                { task: "Standard Pre Bed Steps", emoji: "🌙", signifier: "critical", est: "40 min", notes: "Run your full Standard Pre-Bed routine" },
                { task: "Confirm Gear Setup", emoji: "🎒", signifier: "critical", est: "5 min", notes: "Confirm bag details match tomorrow's specific meetings and gym schedule" },
                { task: "Set Wake Alarm", emoji: "⏰", signifier: "critical", est: "1 min", notes: "Confirm and set wake-up alarm before launching sleep protocol" }
            ],
            "HBP (High Blood Pressure)": [
                { task: "Standard Pre Bed Steps", emoji: "🌙", signifier: "critical", est: "40 min", notes: "Run your full Standard Pre-Bed routine" },
                { task: "Blood Pressure Meds", emoji: "💊", signifier: "critical", est: "2 min", notes: "Take your evening dose of blood pressure medication" },
                { task: "Log Blood Pressure", emoji: "🩺", signifier: "important", est: "2 min", notes: "Log your evening blood pressure reading in Obsidian Daily Note" }
            ],
            "Short on Time or Energy": [
                { task: "Minimal Pre Bed Steps", emoji: "🌙", signifier: "critical", est: "15 min", notes: "Execute minimal non-negotiable Pre-Bed steps" },
                { task: "Verify Critical Items", emoji: "✔️", signifier: "critical", est: "5 min", notes: "Double check that Isha, Vitamins, Brushing, and Phone Charging are done" }
            ]
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
    completedCount: 0,
    skippedCount: 0,
    stepLogs: [],
    isTimerPaused: false,
    
    // User Settings
    settings: {
        webhookUrl: "http://localhost:8080/api/routine/trigger",
        webhookToken: "",
        soundEnabled: true,
        notificationsEnabled: false,
        theme: "dark"
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
        
        card.innerHTML = `
            <div class="routine-icon">${routine.icon}</div>
            <div class="routine-details">
                <h3>${routine.title}</h3>
                <div class="routine-meta-row">
                    <span>⏱️ ${routine.window}</span>
                    <span>🏷️ ${routine.area}</span>
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

// Step 1: Click Routine -> Show Variant selector
function selectRoutine(routineKey) {
    const routine = ROUTINES_DB[routineKey];
    STATE.activeRoutine = routine;
    
    document.getElementById("selector-routine-icon").innerText = routine.icon;
    document.getElementById("selector-routine-name").innerText = routine.title;
    document.getElementById("selector-routine-window").innerText = `Ideal window: ${routine.window} | Area: ${routine.area}`;
    
    const optionsContainer = document.getElementById("variant-options-container");
    optionsContainer.innerHTML = "";
    
    Object.keys(routine.variants).forEach(varName => {
        const steps = routine.variants[varName];
        const btn = document.createElement("button");
        btn.className = "variant-option-btn";
        btn.onclick = () => startRoutine(routineKey, varName);
        
        const logo = getVariantLogo(varName);
        btn.innerHTML = `
            <span>${logo} ${varName}</span>
            <span class="badge-pill">${steps.length} Steps</span>
        `;
        optionsContainer.appendChild(btn);
    });
    
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
    STATE.activeSteps = [...routine.variants[variantName]];
    STATE.currentStepIndex = 0;
    STATE.completedCount = 0;
    STATE.skippedCount = 0;
    STATE.elapsedSeconds = 0;
    STATE.stepLogs = [];
    STATE.startTime = new Date();
    
    // Setup Top Progress Info
    const logo = getVariantLogo(variantName);
    document.getElementById("sequencer-routine-info").innerText = `${logo} ${routine.title} (${variantName})`;
    
    // Webhook Trigger
    fireWebhook("routine_start", { routine: routine.title, variant: variantName });
    
    // Timer setup
    clearInterval(STATE.timerInterval);
    document.getElementById("sequencer-timer").innerText = "00:00";
    
    // Reset Play/Pause visual states
    STATE.isTimerPaused = false;
    const playIcon = document.getElementById("icon-timer-play");
    const pauseIcon = document.getElementById("icon-timer-pause");
    const playPauseBtn = document.getElementById("btn-timer-play-pause");
    const dot = document.getElementById("timer-dot");
    if (playIcon && pauseIcon && playPauseBtn && dot) {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        playPauseBtn.title = "Pause Timer";
        playPauseBtn.classList.remove("paused-btn");
        dot.classList.remove("paused-dot");
    }

    STATE.timerInterval = setInterval(() => {
        if (STATE.isTimerPaused) return;
        STATE.elapsedSeconds++;
        const mins = Math.floor(STATE.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (STATE.elapsedSeconds % 60).toString().padStart(2, '0');
        document.getElementById("sequencer-timer").innerText = `${mins}:${secs}`;
    }, 1000);
    
    // Pre-populate steps list in the sidebar
    renderSidebarSteps();
    
    renderActiveStep();
    showView("sequencer");
}

// Render Sidebar Steps List
function renderSidebarSteps() {
    const container = document.getElementById("sidebar-steps-container");
    container.innerHTML = "";
    
    STATE.activeSteps.forEach((step, idx) => {
        const item = document.createElement("li");
        item.className = "sidebar-step-item";
        item.id = `sidebar-step-${idx}`;
        item.onclick = () => jumpToStep(idx);
        
        item.innerHTML = `
            <div class="sidebar-step-dot ${step.signifier}"></div>
            <span class="step-item-text">${step.emoji || "✨"} ${step.task}</span>
            <span class="sidebar-step-check" id="sidebar-check-${idx}"></span>
        `;
        container.appendChild(item);
    });
}

// Jump to a specific step from sidebar click
function jumpToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= STATE.activeSteps.length) return;
    
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
    
    // Update active highlight classes in sidebar list
    for (let i = 0; i < nSteps; i++) {
        const item = document.getElementById(`sidebar-step-${i}`);
        if (item) {
            if (i === STATE.currentStepIndex) {
                item.classList.add("active");
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove("active");
            }
        }
    }
    
    // Disable/enable Back button based on index position
    const prevBtn = document.getElementById("btn-prev-step");
    if (prevBtn) {
        prevBtn.disabled = (STATE.currentStepIndex === 0);
        prevBtn.style.opacity = (STATE.currentStepIndex === 0) ? "0.3" : "1";
    }
    
    // Raise local notification
    sendLocalNotification(`Routine Action: ${step.task}`, step.notes || "");
}

// Satisfaction-focused next step transitions
function advanceStep(isCompleted) {
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
        
        if (STATE.stepLogs[STATE.currentStepIndex]) {
            STATE.stepLogs[STATE.currentStepIndex] = logEntry;
        } else {
            STATE.stepLogs.push(logEntry);
        }
        
        // Update sidebar checks
        const checkEl = document.getElementById(`sidebar-check-${STATE.currentStepIndex}`);
        const itemEl = document.getElementById(`sidebar-step-${STATE.currentStepIndex}`);
        if (checkEl && itemEl) {
            if (isCompleted) {
                checkEl.innerText = "✓";
                itemEl.classList.add("completed");
            } else {
                checkEl.innerText = "x";
                itemEl.classList.remove("completed");
            }
        }
        
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
    
    // Generate Tana Paste formatted content
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let tanaPaste = `- Completed ${STATE.activeRoutine.title} (${STATE.activeVariant}) at ${nowTime} #project-log\n`;
    
    STATE.stepLogs.forEach(log => {
        const bullet = log.status === "completed" ? "✓" : "x";
        tanaPaste += `  - ${bullet} ${log.task} (${log.time})\n`;
    });
    
    document.getElementById("tana-paste-output").innerText = tanaPaste.trim();
    
    // Persist completion state in localStorage and write Obsidian Logs
    saveCompletionLog(STATE.activeRoutine.id, STATE.activeVariant, STATE.completedCount, nSteps, tanaPaste);
    
    // Webhook Trigger
    fireWebhook("routine_complete", {
        routine: STATE.activeRoutine.title,
        variant: STATE.activeVariant,
        duration_minutes: minutesElapsed,
        completed_steps: STATE.completedCount,
        total_steps: nSteps
    });
    
    showView("complete");
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
});
