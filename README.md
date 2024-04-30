# Web Analytics Tracker: Analytics for Applications made in Next js



https://github.com/nicolasottone/web-analytics-tracker/assets/64184394/c6d079db-27e0-4050-9726-1f8943c608cd



## Summary

Web Analytics Tracker is a comprehensive analytics application built with Next.js, offering real-time insights into user engagement on your website. Through event tracking, page view monitoring, and visitor identification, Web Analytics Tracker empowers you to understand user behavior and optimize your website's performance. The intuitive dashboard visualizes key metrics through charts, graphs, and lists, providing a clear overview of user interactions within a specified timeframe. Leveraging Redis for data storage ensures rapid response times and a seamless user experience.

## API Use:

### Track Pageviews

By default, all current and future pages are dynamically crawled in the middleware.

```js
//middleware.ts
analytics.trackPageview(relativePath)
```

### Track Events:

You can track anything you want, just use `trackEvent` from `@/utils/client_api` and give the event a name.

```jsx
<button onClick={() => trackEvent('buttonClicked')}>Click Me</button>
```

### Track visitors metadata:

By default only geographic information is saved as metadata, but you can modify the API in `@/utils/analytics` to accept more user metadata from the middleware.

```js
//middleware.ts
analytics.trackVisitor(metadata)
```

## Features

*   **🎯 Customizable Event Tracking:** Define and track specific user interactions with server-side actions, gaining granular insights into user behavior.
*   **📈 Page View Monitoring:** Monitor page views through middleware, capturing valuable data on user navigation and popular content.
*   **🔍 Unique Visitor Identification:** Employ temporary cookies to identify and count unique visitors, providing an accurate measure of your website's reach.
*   **📊 Real-time Analytics Dashboard:** Visualize key metrics like page views, events, and visitor demographics through dynamic charts, graphs, and lists.
*   **📅 Date Range Filtering:** Analyze data within specific timeframes using a user-friendly date range picker.
*   **✨ Smooth Animations:** Enjoy a visually pleasing experience with seamless transitions and animations.
*   **📱 Dynamic Interface:** Interact with a responsive and adaptable interface that caters to your analytical needs.
*   **⚡ Low Response Times:** Experience lightning-fast data retrieval and dashboard updates thanks to Redis integration.

## Stack

*   **🚀 Next.js 14**
*   **⚛️ React.js**
*   **⌨️ TypeScript**
*   **🎨 Tailwind CSS**
*   **🧰 Tremor UI**
*   **💾 Redis**

## Getting Started

The project is currently private. For more information or a demonstration, please contact the developer.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Second, add environment variables into your .env file. I use Upstash for this project. [Get yours here](https://console.upstash.com/redis)

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](https://choosealicense.com/licenses/mit/)
