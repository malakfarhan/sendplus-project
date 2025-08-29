import { useState } from 'react';

// material-ui
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Box,
    Button,
    Switch,
    FormControlLabel,
    Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ==============================|| PACKAGE COMPARISON ||============================== //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const ComparisonCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(2),
    '& .MuiTableCell-root': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    }
}));

const PackageComparison = ({ isLoading }) => {
    const [showFeatures, setShowFeatures] = useState(true);

    const comparisonData = [
        {
            feature: 'Provider',
            zong: 'Zong',
            telenor: 'Telenor',
            jazz: 'Jazz',
            ufone: 'Ufone'
        },
        {
            feature: 'Package Name',
            zong: 'Super 4G',
            telenor: 'Smart Bundle',
            jazz: 'Super 4G',
            ufone: 'Power Pack'
        },
        {
            feature: 'Price (Rs.)',
            zong: '999',
            telenor: '799',
            jazz: '899',
            ufone: '699'
        },
        {
            feature: 'Data',
            zong: '50 GB',
            telenor: '30 GB',
            jazz: '40 GB',
            ufone: '25 GB'
        },
        {
            feature: 'Minutes',
            zong: '1000',
            telenor: '800',
            jazz: '1200',
            ufone: '600'
        },
        {
            feature: 'SMS',
            zong: '1000',
            telenor: '800',
            jazz: '1200',
            ufone: '600'
        },
        {
            feature: '4G LTE',
            zong: true,
            telenor: true,
            jazz: true,
            ufone: true
        },
        {
            feature: 'Night Binge',
            zong: true,
            telenor: false,
            jazz: false,
            ufone: false
        },
        {
            feature: 'Social Media Free',
            zong: true,
            telenor: false,
            jazz: true,
            ufone: false
        },
        {
            feature: 'WhatsApp Free',
            zong: false,
            telenor: true,
            jazz: false,
            ufone: false
        },
        {
            feature: 'YouTube Free',
            zong: false,
            telenor: true,
            jazz: false,
            ufone: false
        },
        {
            feature: 'Facebook Free',
            zong: false,
            telenor: false,
            jazz: true,
            ufone: false
        },
        {
            feature: 'Instagram Free',
            zong: false,
            telenor: false,
            jazz: true,
            ufone: false
        },
        {
            feature: 'TikTok Free',
            zong: false,
            telenor: false,
            jazz: false,
            ufone: true
        },
        {
            feature: 'Snapchat Free',
            zong: false,
            telenor: false,
            jazz: false,
            ufone: true
        },
        {
            feature: 'Rating',
            zong: '4.5/5',
            telenor: '4.3/5',
            jazz: '4.4/5',
            ufone: '4.2/5'
        },
        {
            feature: 'Subscribers',
            zong: '2.5M+',
            telenor: '1.8M+',
            jazz: '2.1M+',
            ufone: '1.2M+'
        }
    ];

    const getValueDisplay = (value) => {
        if (typeof value === 'boolean') {
            return value ? (
                <CheckCircleIcon color="success" />
            ) : (
                <CancelIcon color="error" />
            );
        }
        return value;
    };

    const getBestValue = (feature) => {
        const values = [feature.zong, feature.telenor, feature.jazz, feature.ufone];
        if (typeof values[0] === 'boolean') return null;
        
        if (feature.feature === 'Price (Rs.)') {
            const prices = values.map(v => parseInt(v));
            const minPrice = Math.min(...prices);
            return minPrice;
        }
        
        if (feature.feature === 'Data') {
            const dataValues = values.map(v => parseInt(v.split(' ')[0]));
            const maxData = Math.max(...dataValues);
            return maxData;
        }
        
        if (feature.feature === 'Minutes' || feature.feature === 'SMS') {
            const numValues = values.map(v => parseInt(v));
            const maxValue = Math.max(...numValues);
            return maxValue;
        }
        
        if (feature.feature === 'Rating') {
            const ratings = values.map(v => parseFloat(v.split('/')[0]));
            const maxRating = Math.max(...ratings);
            return maxRating;
        }
        
        return null;
    };

    const isBestValue = (value, feature) => {
        const bestValue = getBestValue(feature);
        if (bestValue === null) return false;
        
        if (feature.feature === 'Price (Rs.)') {
            return parseInt(value) === bestValue;
        }
        
        if (feature.feature === 'Data') {
            return parseInt(value.split(' ')[0]) === bestValue;
        }
        
        if (feature.feature === 'Minutes' || feature.feature === 'SMS') {
            return parseInt(value) === bestValue;
        }
        
        if (feature.feature === 'Rating') {
            return parseFloat(value.split('/')[0]) === bestValue;
        }
        
        return false;
    };

    if (isLoading) {
        return <div>Loading comparison...</div>;
    }

    return (
        <ComparisonCard>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">
                        Package Comparison
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFeatures}
                                onChange={(e) => setShowFeatures(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Show Features"
                    />
                </Box>

                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Feature</StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: '#ff6b35' }}>
                                    Zong
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: '#ffd700' }}>
                                    Telenor
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: '#e74c3c' }}>
                                    Jazz
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ backgroundColor: '#3498db' }}>
                                    Ufone
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comparisonData.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        {row.feature}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            {getValueDisplay(row.zong)}
                                            {isBestValue(row.zong, row) && (
                                                <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            {getValueDisplay(row.telenor)}
                                            {isBestValue(row.telenor, row) && (
                                                <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            {getValueDisplay(row.jazz)}
                                            {isBestValue(row.jazz, row) && (
                                                <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            {getValueDisplay(row.ufone)}
                                            {isBestValue(row.ufone, row) && (
                                                <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        Summary
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ bgcolor: '#ff6b35', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6">Best Value</Typography>
                                    <Typography variant="body2">Zong Super 4G</Typography>
                                    <Typography variant="caption">Most features & data</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ bgcolor: '#ffd700', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6">Best Price</Typography>
                                    <Typography variant="body2">Ufone Power Pack</Typography>
                                    <Typography variant="caption">Lowest cost option</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ bgcolor: '#e74c3c', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6">Most Popular</Typography>
                                    <Typography variant="body2">Jazz Super 4G</Typography>
                                    <Typography variant="caption">High subscriber count</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ bgcolor: '#3498db', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6">Best for Social</Typography>
                                    <Typography variant="body2">Telenor Smart Bundle</Typography>
                                    <Typography variant="caption">WhatsApp & YouTube free</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </ComparisonCard>
    );
};

export default PackageComparison; 