import { useState } from 'react';

// material-ui
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Chip,
    Avatar,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

// assets
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularConnectedNoInternet0BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet0Bar';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import SignalCellular3BarIcon from '@mui/icons-material/SignalCellular3Bar';
import SignalCellular2BarIcon from '@mui/icons-material/SignalCellular2Bar';
import SignalCellular1BarIcon from '@mui/icons-material/SignalCellular1Bar';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// ==============================|| NETWORK COVERAGE ||============================== //

const CoverageCard = styled(Card)(({ theme, provider }) => ({
    border: `2px solid ${getProviderColor(provider)}`,
    '&:hover': {
        boxShadow: theme.shadows[4]
    }
}));

const ProviderAvatar = styled(Avatar)(({ provider }) => ({
    width: 40,
    height: 40,
    background: getProviderColor(provider),
    fontSize: '1rem',
    fontWeight: 'bold'
}));

function getProviderColor(provider) {
    const colors = {
        'zong': '#ff6b35',
        'telenor': '#ffd700',
        'jazz': '#e74c3c',
        'ufone': '#3498db'
    };
    return colors[provider] || '#666';
}

function getSignalIcon(strength) {
    switch (strength) {
        case 'Excellent': return <SignalCellular4BarIcon color="success" />;
        case 'Good': return <SignalCellular3BarIcon color="warning" />;
        case 'Fair': return <SignalCellular2BarIcon color="warning" />;
        case 'Poor': return <SignalCellular1BarIcon color="error" />;
        default: return <SignalCellularConnectedNoInternet0BarIcon color="error" />;
    }
}

const NetworkCoverage = ({ isLoading }) => {
    const [currentLocation] = useState('Karachi, Pakistan');
    const [providers] = useState([
        {
            name: 'Zong',
            provider: 'zong',
            coverage: 95,
            signal: 'Excellent',
            speed: '45.2 Mbps',
            latency: '28ms',
            status: 'Active',
            areas: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta']
        },
        {
            name: 'Telenor',
            provider: 'telenor',
            coverage: 88,
            signal: 'Good',
            speed: '38.7 Mbps',
            latency: '32ms',
            status: 'Active',
            areas: ['Karachi', 'Lahore', 'Islamabad', 'Multan', 'Faisalabad']
        },
        {
            name: 'Jazz',
            provider: 'jazz',
            coverage: 92,
            signal: 'Excellent',
            speed: '42.1 Mbps',
            latency: '30ms',
            status: 'Active',
            areas: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Gujranwala']
        },
        {
            name: 'Ufone',
            provider: 'ufone',
            coverage: 85,
            signal: 'Good',
            speed: '35.8 Mbps',
            latency: '35ms',
            status: 'Active',
            areas: ['Karachi', 'Lahore', 'Islamabad', 'Sialkot', 'Gujrat']
        }
    ]);

    const getCoverageColor = (coverage) => {
        if (coverage >= 90) return 'success';
        if (coverage >= 70) return 'warning';
        return 'error';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Maintenance': return 'warning';
            case 'Down': return 'error';
            default: return 'info';
        }
    };

    if (isLoading) {
        return <div>Loading network coverage...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <SignalCellularAltIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h5">
                        Network Coverage
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={3}>
                    <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                        Current Location: {currentLocation}
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {providers.map((provider) => (
                        <Grid item xs={12} key={provider.name}>
                            <CoverageCard provider={provider.provider}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Box display="flex" alignItems="center">
                                            <ProviderAvatar provider={provider.provider} sx={{ mr: 2 }}>
                                                {provider.name.charAt(0)}
                                            </ProviderAvatar>
                                            <Box>
                                                <Typography variant="h6">
                                                    {provider.name}
                                                </Typography>
                                                <Chip 
                                                    label={provider.status} 
                                                    size="small" 
                                                    color={getStatusColor(provider.status)}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            {getSignalIcon(provider.signal)}
                                            <Typography variant="body2" sx={{ ml: 1 }}>
                                                {provider.signal}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="textSecondary">
                                                Coverage
                                            </Typography>
                                            <Box display="flex" alignItems="center">
                                                <LinearProgress 
                                                    variant="determinate" 
                                                    value={provider.coverage}
                                                    color={getCoverageColor(provider.coverage)}
                                                    sx={{ flexGrow: 1, mr: 1 }}
                                                />
                                                <Typography variant="body2" fontWeight="bold">
                                                    {provider.coverage}%
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="textSecondary">
                                                Speed
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold">
                                                {provider.speed}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="body2" color="textSecondary">
                                            Latency: {provider.latency}
                                        </Typography>
                                        <Chip 
                                            label={`${provider.coverage}% Coverage`}
                                            size="small"
                                            color={getCoverageColor(provider.coverage)}
                                        />
                                    </Box>

                                    <Divider sx={{ my: 1 }} />

                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Coverage Areas:
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                                        {provider.areas.map((area, index) => (
                                            <Chip 
                                                key={index}
                                                label={area}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontSize: '0.7rem' }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </CoverageCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Coverage Map Legend */}
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Coverage Legend
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Box 
                                        sx={{ 
                                            width: 20, 
                                            height: 20, 
                                            bgcolor: 'success.main', 
                                            borderRadius: 1,
                                            mr: 1
                                        }} 
                                    />
                                    <Typography variant="body2">Excellent (90%+)</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Box 
                                        sx={{ 
                                            width: 20, 
                                            height: 20, 
                                            bgcolor: 'warning.main', 
                                            borderRadius: 1,
                                            mr: 1
                                        }} 
                                    />
                                    <Typography variant="body2">Good (70-89%)</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Box 
                                        sx={{ 
                                            width: 20, 
                                            height: 20, 
                                            bgcolor: 'error.main', 
                                            borderRadius: 1,
                                            mr: 1
                                        }} 
                                    />
                                    <Typography variant="body2">Poor (&lt;70%)</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Box 
                                        sx={{ 
                                            width: 20, 
                                            height: 20, 
                                            bgcolor: 'grey.400', 
                                            borderRadius: 1,
                                            mr: 1
                                        }} 
                                    />
                                    <Typography variant="body2">No Coverage</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default NetworkCoverage; 