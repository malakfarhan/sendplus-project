import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

// project imports
import PackageCard from './PackageCard';
import PackageComparison from './PackageComparison';
import UsageStats from './UsageStats';
import NetworkCoverage from './NetworkCoverage';

import { gridSpacing } from 'store/constant';

// assets
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import WifiIcon from '@mui/icons-material/Wifi';

// ==============================|| MOBILE PACKAGES DASHBOARD ||============================== //

const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    marginBottom: theme.spacing(2)
}));

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <StyledCard>
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                                <Typography variant="h3" gutterBottom>
                                    Mobile Packages Dashboard
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                    Manage and compare mobile packages like Zong, Telenor, and Jazz
                                </Typography>
                            </Box>
                            <Box display="flex" gap={1}>
                                <Chip 
                                    icon={<PhoneAndroidIcon />} 
                                    label="Active Packages" 
                                    color="primary" 
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'white' }}
                                />
                                <Chip 
                                    icon={<SignalCellularAltIcon />} 
                                    label="Network Status" 
                                    color="success" 
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'white' }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </StyledCard>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} md={12} xs={12}>
                        <PackageCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <UsageStats isLoading={isLoading} />
                            </Grid>
                            <Grid item xs={12}>
                                <NetworkCoverage isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <PackageComparison isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard; 