import * as reportService from "../services/report.service.js";
import sendResponse from "../utils/sendResponse.js";
import { Parser } from "json2csv";

// @desc    Get operational analytics
// @route   GET /api/reports/analytics
// @access  Private (Finance/Manager)
export const getAnalytics = async (req, res, next) => {
    try {
        const analytics = await reportService.getOperationalAnalytics();
        return sendResponse(res, 200, true, "Analytics retrieved successfully", analytics);
    } catch (err) {
        next(err);
    }
};

// @desc    Export analytics as CSV
// @route   GET /api/reports/export/csv
// @access  Private (Finance/Manager)
export const exportAnalyticsCSV = async (req, res, next) => {
    try {
        const analytics = await reportService.getOperationalAnalytics();

        const fields = [
            { label: 'Vehicle', value: 'vehicleName' },
            { label: 'Model', value: 'model' },
            { label: 'Acq. Cost ($)', value: 'acquisitionCost' },
            { label: 'Total Revenue ($)', value: 'totalRevenue' },
            { label: 'Fuel Cost ($)', value: 'totalFuelCost' },
            { label: 'Maintenance ($)', value: 'totalMaintenance' },
            { label: 'Distance (km)', value: 'totalDistance' },
            { label: 'Fuel Eff. (km/L)', value: 'fuelEfficiency' },
            { label: 'ROI (%)', value: 'roi' }
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(analytics);

        res.header('Content-Type', 'text/csv');
        res.attachment('fleet_analytics_report.csv');
        return res.send(csv);
    } catch (err) {
        next(err);
    }
};
