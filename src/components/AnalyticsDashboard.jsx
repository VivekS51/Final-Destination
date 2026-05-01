import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const destinationData = [
  { name: 'Goa', visits: 45000, bookings: 12000, amt: 2400 },
  { name: 'Ladakh', visits: 38000, bookings: 8500, amt: 2210 },
  { name: 'Kerala', visits: 32000, bookings: 9200, amt: 2290 },
  { name: 'Jaipur', visits: 28000, bookings: 11000, amt: 2000 },
  { name: 'Varanasi', visits: 25000, bookings: 6000, amt: 2181 },
];

const activityData = [
    { time: '00:00', users: 1200 },
    { time: '04:00', users: 800 },
    { time: '08:00', users: 3500 },
    { time: '12:00', users: 8400 },
    { time: '16:00', users: 9200 },
    { time: '20:00', users: 6500 },
    { time: '23:59', users: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'var(--navbar-bg)', padding: '10px', border: '1px solid var(--primary-color)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
          <p className="label" style={{ color: 'var(--dark-color)', fontWeight: 'bold' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color, margin: 0 }}>
                  {`${entry.name}: ${entry.value.toLocaleString()}`}
              </p>
          ))}
        </div>
      );
    }
    return null;
};

const AnalyticsDashboard = () => {
    return (
        <section id="analytics" className="analytics-section">
            <div className="section-title reveal-element">
                <span className="subtitle"><i className="fas fa-chart-line"></i> App Insights Telemetry</span>
                <h2>Real-Time Analytics Dashboard</h2>
                <p>Live engagement metrics powered by simulated Azure Application Insights</p>
            </div>
            
            <div className="analytics-container reveal-element" style={{'--i': 1}}>
                {/* Key Metrics Cards */}
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-icon"><i className="fas fa-users"></i></div>
                        <div className="metric-data">
                            <h3>Total Visitors</h3>
                            <p className="metric-value">168,000</p>
                            <span className="metric-trend positive"><i className="fas fa-arrow-up"></i> 12.5% this month</span>
                        </div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-icon"><i className="fas fa-bolt"></i></div>
                        <div className="metric-data">
                            <h3>Avg Load Time</h3>
                            <p className="metric-value">1.2s</p>
                            <span className="metric-trend positive"><i className="fas fa-arrow-down"></i> 0.3s improvement</span>
                        </div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-icon"><i className="fas fa-globe-asia"></i></div>
                        <div className="metric-data">
                            <h3>Active Users Right Now</h3>
                            <p className="metric-value pulse-text">4,281</p>
                            <span className="metric-trend neutral">Live</span>
                        </div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="charts-grid">
                    <div className="chart-box main-chart">
                        <h3>Destination Popularity (Goa vs Ladakh)</h3>
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={destinationData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                                    <XAxis dataKey="name" stroke="var(--dark-color)" />
                                    <YAxis stroke="var(--dark-color)" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="visits" name="Total Visits" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="bookings" name="Bookings Made" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-box secondary-chart">
                        <h3>Hourly Active Traffic</h3>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <AreaChart
                                    data={activityData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" vertical={false} />
                                    <XAxis dataKey="time" stroke="var(--dark-color)" />
                                    <YAxis stroke="var(--dark-color)" hide />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="users" name="Active Users" stroke="var(--secondary-color)" fill="var(--secondary-color)" fillOpacity={0.3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
