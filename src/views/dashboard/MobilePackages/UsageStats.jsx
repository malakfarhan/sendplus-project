import { useState, useEffect } from 'react';

// material-ui
import {
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    Grid,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

// assets
import WifiIcon from '@mui/icons-material/Wifi';
import PhoneIcon from '@mui/icons-material/Phone';
import SmsIcon from '@mui/icons-material/Sms';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SpeedIcon from '@mui/icons-material/Speed';

// ==============================|| USAGE STATS ||============================== //

const StatsCard = styled(Card)(({ theme }) => ({
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '& .MuiCardContent-root': {
        padding: theme.spacing(2)
    }
}));

const ProgressCard = styled(Card)(({ theme }) => ({
    height: '100%',
    '& .MuiLinearProgress-root': {
        height: 8,
        borderRadius: 4
    }
}));

const UsageStats = ({ isLoading }) => {
    const [usageData, setUsageData] = useState({
        data: {
            used: 35.2,
            total: 50,
            unit: 'GB',
            percentage: 70.4
        },
        minutes: {
            used: 650,
            total: 1000,
            unit: 'min',
            percentage: 65
        },
        sms: {
            used: 120,
            total: 1000,
            unit: 'SMS',
            percentage: 12
        }
    });

    const [topApps, setTopApps] = useState([
        { name: 'WhatsApp', usage: 12.5, icon: '💬', color: '#25D366' },
        { name: 'YouTube', usage: 8.2, icon: '📺', color: '#FF0000' },
        { name: 'Facebook', usage: 6.8, icon: '📘', color: '#1877F2' },
        { name: 'Instagram', usage: 4.5, icon: '📷', color: '#E4405F' },
        { name: 'TikTok', usage: 3.2, icon: '🎵', color: '#000000' }
    ]);

    const [networkStats, setNetworkStats] = useState({
        speed: '45.2 Mbps',
        signal: 'Excellent',
        coverage: '95%',
        latency: '28ms'
    });

    useEffect(() => {
        // Simulate real-time data updates
        const interval = setInterval(() => {
            setUsageData(prev => ({
                data: {
                    ...prev.data,
                    used: prev.data.used + (Math.random() - 0.5) * 0.1,
                    percentage: ((prev.data.used + (Math.random() - 0.5) * 0.1) / prev.data.total) * 100
                },
                minutes: {
                    ...prev.minutes,
                    used: prev.minutes.used + Math.floor(Math.random() * 5),
                    percentage: ((prev.minutes.used + Math.floor(Math.random() * 5)) / prev.minutes.total) * 100
                },
                sms: {
                    ...prev.sms,
                    used: prev.sms.used + Math.floor(Math.random() * 2),
                    percentage: ((prev.sms.used + Math.floor(Math.random() * 2)) / prev.sms.total) * 100
                }
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getProgressColor = (percentage) => {
        if (percentage > 80) return 'error';
        if (percentage > 60) return 'warning';
        return 'success';
    };

    const getSignalColor = (signal) => {
        switch (signal) {
            case 'Excellent': return 'success';
            case 'Good': return 'warning';
            case 'Poor': return 'error';
            default: return 'info';
        }
    };

    if (isLoading) {
        return <div>Loading usage stats...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Usage Statistics
                </Typography>

                {/* Current Package Stats */}
                <StatsCard sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Current Package: Zong Super 4G
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Valid until: 15 days remaining
                        </Typography>
                    </CardContent>
                </StatsCard>

                {/* Usage Progress */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                        <ProgressCard>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Box display="flex" alignItems="center">
                                        <WifiIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">
                                            Data Usage
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {usageData.data.used.toFixed(1)} / {usageData.data.total} {usageData.data.unit}
                                    </Typography>
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={usageData.data.percentage} 
                                    color={getProgressColor(usageData.data.percentage)}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    {usageData.data.percentage.toFixed(1)}% used
                                </Typography>
                            </CardContent>
                        </ProgressCard>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ProgressCard>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Box display="flex" alignItems="center">
                                        <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">
                                            Minutes
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {usageData.minutes.used} / {usageData.minutes.total} {usageData.minutes.unit}
                                    </Typography>
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={usageData.minutes.percentage} 
                                    color={getProgressColor(usageData.minutes.percentage)}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    {usageData.minutes.percentage.toFixed(1)}% used
                                </Typography>
                            </CardContent>
                        </ProgressCard>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ProgressCard>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Box display="flex" alignItems="center">
                                        <SmsIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">
                                            SMS
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {usageData.sms.used} / {usageData.sms.total} {usageData.sms.unit}
                                    </Typography>
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={usageData.sms.percentage} 
                                    color={getProgressColor(usageData.sms.percentage)}
                                />
                                <Typography variant="caption" color="textSecondary">
                                    {usageData.sms.percentage.toFixed(1)}% used
                                </Typography>
                            </CardContent>
                        </ProgressCard>
                    </Grid>
                </Grid>

                {/* Network Stats */}
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Network Performance
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box textAlign="center">
                                    <SpeedIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h6">{networkStats.speed}</Typography>
                                    <Typography variant="caption" color="textSecondary">Download Speed</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box textAlign="center">
                                    <Chip 
                                        label={networkStats.signal} 
                                        color={getSignalColor(networkStats.signal)}
                                        variant="outlined"
                                    />
                                    <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
                                        Signal Strength
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Top Apps Usage */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Top Apps by Data Usage
                        </Typography>
                        <List>
                            {topApps.map((app, index) => (
                                <Box key={app.name}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: app.color, fontSize: '1.2rem' }}>
                                                {app.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={app.name}
                                            secondary={`${app.usage} GB used`}
                                        />
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                                {((app.usage / usageData.data.used) * 100).toFixed(1)}%
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={(app.usage / usageData.data.used) * 100}
                                                sx={{ width: 60, height: 6 }}
                                            />
                                        </Box>
                                    </ListItem>
                                    {index < topApps.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default UsageStats; 