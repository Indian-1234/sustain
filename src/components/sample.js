import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

// Sample data - Replace with your actual data source
const data = [
  { time: '00:00', pressure: 7.2, flow: 450, power: 75, efficiency: 6, dewPoint: 3, temperature: 25, humidity: 45 },
  { time: '04:00', pressure: 7.1, flow: 440, power: 73, efficiency: 6.1, dewPoint: 3.2, temperature: 26, humidity: 46 },
  { time: '08:00', pressure: 7.3, flow: 470, power: 78, efficiency: 5.9, dewPoint: 3.1, temperature: 27, humidity: 47 },
  { time: '12:00', pressure: 7.4, flow: 480, power: 80, efficiency: 5.8, dewPoint: 3.3, temperature: 28, humidity: 48 },
  { time: '16:00', pressure: 7.2, flow: 460, power: 76, efficiency: 6, dewPoint: 3.2, temperature: 27, humidity: 46 },
  { time: '20:00', pressure: 7.1, flow: 450, power: 74, efficiency: 6.1, dewPoint: 3.1, temperature: 26, humidity: 45 },
];

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function ChartCard({ title, children }) {
  return (
    <Card sx={{ height: '100%', minHeight: 400 }}>
      <CardHeader 
        title={title} 
        titleTypography={{ variant: 'h6' }}
        sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          p: 2
        }}
      />
      <CardContent sx={{ height: 350 }}>
        {children}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className='ml-16'>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom component="h1">
            Compressed Air System Monitoring
          </Typography>

          <Grid container spacing={3}>
            {/* Pressure Monitoring */}
            <Grid item xs={12} md={6}>
              <ChartCard title="Pressure Monitoring (kg/cm²)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="pressure" 
                      stroke="#8884d8" 
                      name="Header Pressure"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Flow and Power Analysis */}
            <Grid item xs={12} md={6}>
              <ChartCard title="Flow (CFM) and Power (kW) Analysis">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="flow" 
                      fill="#82ca9d" 
                      name="Flow Rate"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="power" 
                      stroke="#ff7300" 
                      name="Power Consumption"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Efficiency Tracking */}
            <Grid item xs={12} md={6}>
              <ChartCard title="System Efficiency (CFM/kWh)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#82ca9d" 
                      name="Efficiency"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Air Quality Metrics */}
            <Grid item xs={12} md={6}>
              <ChartCard title="Air Quality Monitoring">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="dewPoint" 
                      stroke="#8884d8" 
                      name="Dew Point (°Ctd)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#82ca9d" 
                      name="Temperature (°C)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#ffc658" 
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Current Status */}
            <Grid item xs={12}>
              <Card>
                <CardHeader 
                  title="Current System Status" 
                  sx={{ 
                    backgroundColor: 'primary.main', 
                    color: 'white',
                  }}
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">
                        Header Pressure: {data[data.length - 1].pressure} kg/cm²
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">
                        Flow Rate: {data[data.length - 1].flow} CFM
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">
                        Power Consumption: {data[data.length - 1].power} kW
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
    </div>
  );
}

export default Dashboard;