// Import necessary modules
const axios = require('axios');
const { MongoClient } = require('mongodb');

// Define constants
const COOKIE = "sb=yY8PZ2hJgS4IYsJYftGlwNxP; datr=yY8PZ8-6cScq5TTemNkDKhaE; ps_l=1; ps_n=1; c_user=100070448054752; xs=20%3AOMqR2kLr7XWf1A%3A2%3A1734707777%3A-1%3A6427; fr=1OvTlq5o8l4fR6qPP.AWV7CQ7l7EjbRBmHSjfiojhREiE.BnZYgy..AAA.0.0.BnZZb5.AWX80vGQeEQ; dpr=1.125; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1734711044099%2C%22v%22%3A1%7D; wd=1126x811";
const URL = "https://www.facebook.com/api/graphql/";
const INITIAL_PAYLOAD = `__user=100070448054752&__a=1&__req=3n&__hs=20077.HYP%3Acomet_pkg.2.1.0.2.1&dpr=1&__ccg=EXCELLENT&__rev=1019029190&__s=rpgwby%3A7hbkuy%3Arvsvcx&__hsi=7450513179139818351&__dyn=7xeXzWK2l2u7Ung569yaxG4Qih0noeEb8nwgUaofVUKbgS3qi7UK361twYwJyEiwsobo6u3y4o27wywn82nwb-q7oc81EEbbwto88422y11wBz822wtU4a3a4oaEnxO0Bo4O2-2l2UtwxwhU31wiE567Udo5qfK0zEkxe2GexeeDwkUtxGm2SU4i5oe8cEW4-5pUfEdbwxwhFVovUaU6a1TxW2-VEbUGdG0HE88cA0z8c84p1e4UK2K2WEjxK2B08-269wkopg6C13xe3a3Gfw-Kufxa3mUqwjVqwLwHwGwbu5E&__csr=g8s7IfN4kx4cMBb1n5mxs_NAQAr9SB4ccsOZ9hkzkAWPN2lHGGmnsytiWuoyAWEJtsJdbvh6HQ9Bh4jHvFnl9SlGRHqUyAmLpqUCh2pFUHmERbpdemRJauV4jFLh9eFWrABV5UJyFohy44pp7BDKaLhGjAvBHCGqdy9WHy89UOiHhpuiVozy8WmfGbzVZ3o-mmuQ4pV9em4ojxWUhyaAy8nXxeU98a9ucx2GDV8S49aADDxiUizQaAGiiEjxiUhDQ5EWm9DK6U8UG5F8KmeUgVEizpU4CawLzQ8AAG58Kcggxe3e2y6Vp8K3K5EbA4poowxyUaAczqSGwXDxC1rxeu9wwwzwFBwl9F41rzqye221oyo3pw6rAwoE5t04RwaOaCzU4K0RouyHzUqo1QS0ra1pwo46Oyki9xB4wt815k1kwywNJ90GwjA6U7e04jliLFxK8m4sHFk0MA02se3Wfg1etQ0ri2O0oO8xW08Gwf2041o0vpx500rEUmui-03HS079E1ho4ugCb4w2qU22yVU1r9UC3d0deqi0GECq0Doeo13oG3WOwmEyu0jW0CU5y2a0hC1Yw4US1Xw8W0Z8CbBodUC0qeu0vq0xA0xV2N04gweoaU2DxS08pw1hq0WElBK4o99Uy2a0H8dbgy36zh2xdVD4PHe8G8Q2q7U7GWig1jEO0va264o8U6O1D86o25w1bC02rS-0gB021UdoaQpi90Jxe0XLG3u0Go1oUC0pq2Kfo3Fwlo0ye07aqxj2cb042w18W7o3gwho6C&__comet_req=15&fb_dtsg=NAcOeXHrVuLhqT7H0jkuGoIIQ2Y6eSrq31uA5-iMs7m6mTCiNwaSccQ%3A20%3A1734707777&jazoest=25454&lsd=bxoyItvy_mI7dnM-oKF4_W&__spin_r=1019029190&__spin_b=trunk&__spin_t=1734707779&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables=%7B%22count%22%3A3%2C%22cursor%22%3A%22Cg8TZXhpc3RpbmdfdW5pdF9jb3VudAICDwtyZWFsX2N1cnNvcg%2BfQVFIUmlITThzTnFVcjJoV0tpdjFDTEFJZkFwMk8xRWQ1TWtjeHZ0UGVEbmQyYlBEWnJvWGJYQ0tWVldsM0V0ZXp1RWRxZWRxcFhZa1QybFlzRl9yUWZ3SEVBOmV5SXdJam94TnpNME56QTRNVEExTENJeElqbzNOamd5TENJeklqb3dMQ0kwSWpveExDSTFJam95TENJMklqb3RNWDA9DxNoZWFkZXJfZ2xvYmFsX2NvdW50AgEPEm1haW5fZmVlZF9wb3NpdGlvbgICDw1mZWVkX29yZGVyaW5nDw1hdHRhY2hlZF90aW1lDxNpc19ldmVyZ3JlZW5fY3Vyc29yEQAPImlzX29mZmxpbmVfYWdncmVnYXRlZF9wb3N0c19jdXJzb3IRAA8SZ3JvdXBfZmVlZF92ZXJzaW9uDwJWMg8QZGVtb3RlZF9wb3N0X2lkcwoBAQ%3D%3D%22%2C%22feedLocation%22%3A%22GROUP%22%2C%22feedType%22%3A%22DISCUSSION%22%2C%22feedbackSource%22%3A0%2C%22focusCommentID%22%3Anull%2C%22privacySelectorRenderLocation%22%3A%22COMET_STREAM%22%2C%22renderLocation%22%3A%22group%22%2C%22scale%22%3A1%2C%22sortingSetting%22%3A%22CHRONOLOGICAL%22%2C%22stream_initial_count%22%3A1%2C%22useDefaultActor%22%3Afalse%2C%22id%22%3A%22314810416899010%22%2C%22__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsWorkUserrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider%22%3A500%2C%22__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsMergQAPollsrelayprovider%22%3Afalse%2C%22__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIShareActionMigrationrelayprovider%22%3Atrue%2C%22__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider%22%3Atrue%2C%22__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=8710004115744333`;

// Define headers for POST requests
const POST_HEADERS = {
    'Accept': '*/*',
    'Accept-Language': 'vi,en;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': COOKIE,
    'Origin': 'https://www.facebook.com',
    'Priority': 'u=1, i',
    'Referer': 'https://www.facebook.com',
    'Sec-CH-Prefers-Color-Scheme': 'light',
    'Sec-CH-UA': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'Sec-CH-UA-Full-Version-List': '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Model': '""',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-CH-UA-Platform-Version': '"15.0.0"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'X-ASBD-ID': '129477',
    'X-FB-Friendly-Name': 'GroupsCometFeedRegularStoriesPaginationQuery',
    'X-FB-LSD': 'JUjVW0chjR5EEXztgIL_20'
};

// Define headers for GET requests
const GET_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'vi,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Cookie': COOKIE,
    'DPR': '0.9',
    'Priority': 'u=0, i',
    'Sec-CH-Prefers-Color-Scheme': 'light',
    'Sec-CH-UA': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'Sec-CH-UA-Full-Version-List': '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Model': '""',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-CH-UA-Platform-Version': '"15.0.0"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Viewport-Width': '1446'
};

// MongoDB connection URI and client setup
const MONGODB_URI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(MONGODB_URI);

// Function to connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

// Function to get the cursor from the initial POST request
async function getCursor() {
    try {
        const response = await axios.post(URL, INITIAL_PAYLOAD, { headers: POST_HEADERS });
        const cursorPattern = /"cursor":"([^"]+)"/;
        const match = response.data.match(cursorPattern);
        const cursor = match ? match[1] : "Cursor not found";
        return cursor;
    } catch (error) {
        console.error('Error in getCursor:', error);
        return "Cursor not found";
    }
}

// Function to get data from a permalink URL
async function getData(permalinkUrl) {
    try {
        const response = await axios.get(permalinkUrl, { headers: GET_HEADERS });
        const html = response.data;

        // Extract tag from the title
        const titlePattern = /<title>.*?#([a-zA-Z0-9]+)<\/title>/;
        const titleMatch = html.match(titlePattern);
        const tag = titleMatch ? titleMatch[1] : "";

        // Define image patterns
        const imagePatterns = [
            /<meta property="og:image" content="([^"]+)"/g,
            /"image":{"uri":"([^"]+)"/g,
            /https:\/\/[^"]*?fbcdn\.net[^"]*?\/v\/t39\.[^"]+?\/\d+_\d+_\d+_n\.(?:jpg|jpeg|png)[^"]*?(?:width=\d+|height=\d+)[^"]*?/g
        ];

        let images = [];

        imagePatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(html)) !== null) {
                let imageUrl = match[1] || match[0];
                if (typeof imageUrl === 'object') {
                    imageUrl = imageUrl[1];
                }
                if (imageUrl.includes('scontent') && (imageUrl.includes('_n.') || imageUrl.includes('_o.'))) {
                    images.push(imageUrl.replace(/\\\//g, '/'));
                }
            }
        });

        // Remove duplicates and limit to first 3 images
        images = [...new Set(images)].slice(0, 3);

        console.log(`URL: ${permalinkUrl}`);
        console.log(`Tag found: ${tag}`);
        console.log(`Number of images found: ${images.length}`);
        console.log(`First image URL: ${images[0] || "No images found"}`);

        return { tag, images };
    } catch (error) {
        console.error(`Error parsing data from ${permalinkUrl}:`, error);
        return { tag: "", images: [] };
    }
}

// Function to get the next page of data
async function getPage() {
    try {
        const cursor = await getCursor();
        console.log(`Current Cursor: ${cursor}`);

        // Construct the payload with the new cursor
        const payload = `__user=100070448054752&__a=1&__req=3n&__hs=20077.HYP:comet_pkg.2.1.0.2.1&dpr=1&__ccg=EXCELLENT&__rev=1019029190&__s=rpgwby:7hbkuy:rvsvcx&__hsi=7450513179139818351&__dyn=7xeXzWK2l2u7Ung569yaxG4Qih0noeEb8nwgUaofVUKbgS3qi7UK361twYwJyEiwsobo6u3y4o27wywn82nwb-q7oc81EEbbwto88422y11wBz822wtU4a3a4oaEnxO0Bo4O2-2l2UtwxwhU31wiE567Udo5qfK0zEkxe2GexeeDwkUtxGm2SU4i5oe8cEW4-5pUfEdbwxwhFVovUaU6a1TxW2-VEbUGdG0HE88cA0z8c84p1e4UK2K2WEjxK2B08-269wkopg6C13xe3a3Gfw-Kufxa3mUqwjVqwLwHwGwbu5E&__csr=g8s7IfN4kx4cMBb1n5mxs_NAQAr9SB4ccsOZ9hkzkAWPN2lHGGmnsytiWuoyAWEJtsJdbvh6HQ9Bh4jHvFnl9SlGRHqUyAmLpqUCh2pFUHmERbpdemRJauV4jFLh9eFWrABV5UJyFohy44pp7BDKaLhGjAvBHCGqdy9WHy89UOiHhpuiVozy8WmfGbzVZ3o-mmuQ4pV9em4ojxWUhyaAy8nXxeU98a9ucx2GDV8S49aADDxiUizQaAGiiEjxiUhDQ5EWm9DK6U8UG5F8KmeUgVEizpU4CawLzQ8AAG58Kcggxe3e2y6Vp8K3K5EbA4poowxyUaAczqSGwXDxC1rxeu9wwwzwFBwl9F41rzqye221oyo3pw6rAwoE5t04RwaOaCzU4K0RouyHzUqo1QS0ra1pwo46Oyki9xB4wt815k1kwywNJ90GwjA6U7e04jliLFxK8m4sHFk0MA02se3Wfg1etQ0ri2O0oO8xW08Gwf2041o0vpx500rEUmui-03HS079E1ho4ugCb4w2qU22yVU1r9UC3d0deqi0GECq0Doeo13oG3WOwmEyu0jW0CU5y2a0hC1Yw4US1Xw8W0Z8CbBodUC0qeu0vq0xA0xV2N04gweoaU2DxS08pw1hq0WElBK4o99Uy2a0H8dbgy36zh2xdVD4PHe8G8Q2q7U7GWig1jEO0va264o8U6O1D86o25w1bC02rS-0gB021UdoaQpi90Jxe0XLG3u0Go1oUC0pq2Kfo3Fwlo0ye07aqxj2cb042w18W7o3gwho6C&__comet_req=15&fb_dtsg=NAcOeXHrVuLhqT7H0jkuGoIIQ2Y6eSrq31uA5-iMs7m6mTCiNwaSccQ:20:1734707777&jazoest=25454&lsd=bxoyItvy_mI7dnM-oKF4_W&__spin_r=1019029190&__spin_b=trunk&__spin_t=1734707779&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables=%7B%22count%22%3A3%2C%22cursor%22%3A%22${cursor}%22%2C%22feedLocation%22%3A%22GROUP%22%2C%22feedType%22%3A%22DISCUSSION%22%2C%22feedbackSource%22%3A0%2C%22focusCommentID%22%3Anull%2C%22privacySelectorRenderLocation%22%3A%22COMET_STREAM%22%2C%22renderLocation%22%3A%22group%22%2C%22scale%22%3A1%2C%22sortingSetting%22%3A%22CHRONOLOGICAL%22%2C%22stream_initial_count%22%3A1%2C%22useDefaultActor%22%3Afalse%2C%22id%22%3A%22314810416899010%22%2C%22__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsWorkUserrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider%22%3A500%2C%22__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsMergQAPollsrelayprovider%22%3Afalse%2C%22__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIShareActionMigrationrelayprovider%22%3Atrue%2C%22__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider%22%3Atrue%2C%22__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=8710004115744333`;

        const response = await axios.post(URL, payload, { headers: POST_HEADERS });
        const responseData = response.data;

        // Extract new cursor
        const cursorPattern = /"cursor":"([^"]+)"/;
        const cursorMatch = responseData.match(cursorPattern);
        const newCursor = cursorMatch ? cursorMatch[1] : "Cursor not found";
        console.log(`New Cursor: ${newCursor}`);

        // Extract permalink links
        const permalinkPattern = /"url":"(https:\\\/\\\/www\.facebook\.com\\\/groups\\\/\d+\\\/permalink\\\/\d+\\\/?)"/g;
        const permalinkMatches = [...responseData.matchAll(permalinkPattern)];
        const uniqueLinks = new Set();

        permalinkMatches.forEach(match => {
            if (match[1]) {
                const cleanLink = match[1].replace(/\\\//g, '/');
                uniqueLinks.add(cleanLink);
            }
        });

        // Iterate over unique links and fetch data
        for (const link of uniqueLinks) {
            const data = await getData(link);
            // You can store `data` to MongoDB here if needed
            // Example:
            // const db = client.db('your_database');
            // const collection = db.collection('your_collection');
            // await collection.insertOne(data);
        }
    } catch (error) {
        console.error('Error in getPage:', error);
    }
}

// Main function to run the scraper
async function main() {
    await connectToMongo();

    // Run getPage every 5 seconds
    setInterval(async () => {
        await getPage();
    }, 5000);
}

// Start the scraper
main().catch(error => console.error('Unhandled error:', error));
