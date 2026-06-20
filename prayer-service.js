/* ==========================================================================
   Prayer Service - Geolocation and AlAdhan API Integration
   ========================================================================== */

const PrayerService = {
    cacheKey: "nexus_prayer_timings_cache",
    
    // Check if geolocation is supported
    isLocationSupported() {
        return "geolocation" in navigator;
    },

    // Request user's coordinates
    async getCoordinates() {
        return new Promise((resolve, reject) => {
            if (!this.isLocationSupported()) {
                reject(new Error("Geolocation not supported by browser."));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
            );
        });
    },

    // Fetch timings from AlAdhan API
    async fetchTimings(lat, lng) {
        const todayStr = this.getLocalDateString(new Date());
        
        // Try reading from cache first
        const cached = this.getCachedData();
        if (cached && cached.date === todayStr && cached.lat === lat.toFixed(4) && cached.lng === lng.toFixed(4)) {
            console.log("[PrayerService] Using cached prayer timings.");
            return cached.timings;
        }

        // Fetch fresh data (method=2 for ISNA, school=1 for Hanafi / later Asr)
        const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2&school=1`;
        console.log(`[PrayerService] Fetching timings from AlAdhan: ${url}`);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch prayer times: ${response.statusText}`);
        }
        
        const json = await response.json();
        if (json.code !== 200 || !json.data || !json.data.timings) {
            throw new Error("Invalid API response format.");
        }

        const timings = json.data.timings;
        
        // Save to cache
        this.setCachedData({
            date: todayStr,
            lat: lat.toFixed(4),
            lng: lng.toFixed(4),
            timings: timings
        });

        return timings;
    },

    // Date formatting helper (DD-MM-YYYY)
    getLocalDateString(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    },

    // Cache management
    getCachedData() {
        try {
            const data = localStorage.getItem(this.cacheKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("[PrayerService] Error reading cache", e);
            return null;
        }
    },

    setCachedData(obj) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(obj));
        } catch (e) {
            console.error("[PrayerService] Error writing cache", e);
        }
    },

    // Calculate Latest Wake Up and Target Bedtime based on Sunrise time (format: "HH:MM")
    calculateSleepTargets(sunriseStr) {
        if (!sunriseStr) return null;
        
        const [sunHrs, sunMins] = sunriseStr.split(':').map(Number);
        
        // Calculate Latest Wake Up: Sunrise - 10 minutes
        let wakeHrs = sunHrs;
        let wakeMins = sunMins - 10;
        if (wakeMins < 0) {
            wakeMins += 60;
            wakeHrs = (wakeHrs - 1 + 24) % 24;
        }
        
        // Calculate Target Bedtime: Wake Up - 8 hours - 15 minutes (Total 8h 15m prior)
        let bedHrs = wakeHrs - 8;
        let bedMins = wakeMins - 15;
        if (bedMins < 0) {
            bedMins += 60;
            bedHrs = (bedHrs - 1 + 24) % 24;
        }
        bedHrs = (bedHrs + 24) % 24;

        const pad = (n) => String(n).padStart(2, '0');
        return {
            latestWakeUp: `${pad(wakeHrs)}:${pad(wakeMins)}`,
            targetBedtime: `${pad(bedHrs)}:${pad(bedMins)}`
        };
    },

    // Helper to format HH:MM string to 12-hour AM/PM format
    formatTo12Hour(timeStr) {
        if (!timeStr) return "";
        const [hrs, mins] = timeStr.split(':').map(Number);
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        const formattedHrs = hrs % 12 || 12;
        return `${formattedHrs}:${String(mins).padStart(2, '0')} ${ampm}`;
    }
};
