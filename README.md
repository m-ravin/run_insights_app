# Run Insights App 🏃‍♂️

A powerful, Strava-integrated dashboard for runners who want deeper insights into their training, injury risk, and performance.

![Dashboard Overview](public/images/dashboard-overview.png)

## 🚀 Features

### 1. Advanced Training Status
Get an instant snapshot of your current training state.
- **Run Health**: Visual indicator based on your Acute:Chronic Workload Ratio (ACR).
- **Run Fitness**: Tracks your chronic load trend to see if you are improving, maintaining, or detraining.
- **Daily Capacity**: Know exactly how much you can run today without increasing injury risk.

### 2. Injury Risk Analysis
Visualize your injury risk over time with our advanced ACR model.
- **Dynamic Risk Zones**: See when you are in the "Sweet Spot" (Green), "Overreaching" (Yellow), or "High Risk" (Red).
- **Historical Tracking**: Monitor your risk trends over the last 90 days.

![Injury Risk Chart](public/images/injury-risk-chart.png)

### 3. Smart Load Management
Balance your training load with your capacity.
- **Weekly Mileage & Zones**: Compare your rolling weekly mileage against your dynamic capacity limits.
- **Interactive Planner**: Plan your runs for the week and see if they fit within your safe limits.

![Weekly Mileage Chart](public/images/weekly-mileage-chart.png)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Integration**: [Strava API](https://developers.strava.com/)

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- A Strava Account
- Strava API Application (Client ID & Secret)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/m-ravin/run-insights-app.git
   cd run-insights-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   STRAVA_CLIENT_ID=your_client_id
   STRAVA_CLIENT_SECRET=your_client_secret
   STRAVA_REDIRECT_URI=http://localhost:3000/api/strava/callback
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Privacy & Security
- Your Strava tokens are stored securely in **HTTP-Only cookies**.
- Data is processed locally in your browser or strictly for your session.

## 📄 License
MIT
