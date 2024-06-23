const fs = require("fs").promises;
const path = require("path");
const Opportunity = require("../models/opportunity.model");
const { winstonLogger } = require("./winstonLogger.util");

/**
 * Seed opportunities from a JSON file
 * @author: Hari Prasad Joshi
 */
async function seedOpportunities() {
  try {
    // Read the file
    const filePath = path.join(__dirname, "../../seed/opportunities.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // Extract opportunities from the data
    const opportunities = Object.values(data.internships_meta);
    let countOpportunityInserted = 0;
    for (const opp of opportunities) {
      // Check if the opportunity already exists in the database
      const existingOpp = await Opportunity.findOne({ internshipId: opp.id });

      if (!existingOpp) {
        // Create a new opportunity document
        try {
          const newOpportunity = new Opportunity({
            internshipId: opp.id,
            title: opp.title,
            duration: opp.duration,
            profile_name: opp.profile_name,
            company_name: opp.company_name,
            stipend: {
              salary: opp.stipend.salary,
              tooltip: opp.stipend.tooltip,
              salaryValue1: opp.stipend.salaryValue1,
              salaryValue2: opp.stipend.salaryValue2,
              salaryType: opp.stipend.salaryType,
              currency: opp.stipend.currency,
              scale: opp.stipend.scale,
              large_stipend_text: opp.stipend.large_stipend_text,
            },
            location_names: opp.location_names,
            start_date: opp.start_date,
            employer_name: opp.employer_name,
            posted_on: opp.posted_on,
            expires_at: opp.expires_at,
            employment_type: opp.employment_type,
          });

          // Save the new opportunity
          await newOpportunity.save();
          countOpportunityInserted++;
          winstonLogger.info(`Saved new opportunity: ${opp.title}`);
        } catch (error) {
          winstonLogger.error("Error saving opportunity:", error);
          // console.error('Error saving opportunity:', opp);
        }
      } else {
        winstonLogger.info(`Opportunity already exists: ${opp.title}`);
      }
    }

    winstonLogger.info(
      `Finished seeding opportunities. ${countOpportunityInserted} new Opportunities inserted. Total opportunities: ${opportunities.length}`
    );
  } catch (error) {
    console.error("Error seeding opportunities:", error);
  }
}

module.exports = seedOpportunities;
