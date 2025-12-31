import { Project } from './types'

export const PROJECTS: Project[] = [
    {
        title: "ConnectSphere Churn Prediction",
        slug: "connectsphere-churn-prediction",
        description: "An end-to-end data science solution designed to proactively predict customer churn for ConnectSphere Telecom, reducing revenue loss by 15%.",
        tags: ["Python", "Scikit-learn", "Streamlit", "ML"],
        projectType: "deployed-app",
        category: "data-science",
        caseStudyEnabled: true,
        liveUrl: "https://connectsphere.streamlit.app/",
        githubUrl: "https://github.com/aDataMage/COnnectSphere",
        externalBadge: "Streamlit App",
        technologies: ["Random Forest", "Streamlit", "Python", "Pandas", "Docker"],
        featured: true,
        thumbnail: "/projects/connectsphere_cover.png",
        caseStudy: {
            overview: {
                summary: "In the competitive telecom sector, customer retention is paramount. ConnectSphere was facing a 12% annual churn rate. I built a predictive system to identify at-risk customers early, allowing the marketing team to intervene with targeted offers.",
                role: "End-to-End Data Scientist",
                timeline: "8 Weeks",
                teamSize: 1
            },
            problem: {
                statement: "Customer churn was eroding $2.5M in annual revenue. The existing manual identification process was reactive and too slow to prevented departures.",
                businessContext: "The marketing team needed a prioritized list of 'at-risk' customers each Monday to launch retention campaigns.",
                goals: [
                    "Reduce annual churn rate by 15%",
                    "Achieve >80% recall to capture most potential churners",
                    "Automate the weekly risk reporting process"
                ]
            },
            methodology: {
                approach: "I followed the CRISP-DM methodology, starting with data understanding and moving to model deployment. I selected a Random Forest classifier for its robustness and interpretability.",
                processSteps: [
                    { title: "Data Ingestion & Cleaning", description: "Consolidated 500k records from SQL databases and flat files. Handled missing values in demographic data using KNN imputation." },
                    { title: "EDA & Feature Engineering", description: "Identified 'Month-to-Month' contracts and 'Fiber Optic' service as high-risk factors. Created new features like 'Support Interaction Ratio'." },
                    { title: "Model Development", description: "Trained Logistic Regression, SVM, and Random Forest models. Tuned Random Forest using GridSearch, optimizing for Recall." },
                    { title: "Deployment", description: "Built an interactive Streamlit dashboard for the marketing team and containerized the prediction API using Docker." }
                ]
            },
            results: {
                metrics: [
                    { label: "Accuracy", value: "87%", trend: "up" },
                    { label: "Recall (Churners)", value: "82%", trend: "up" },
                    { label: "Est. Revenue Saved", value: "$450k/yr", trend: "up" }
                ],
                impact: "The dashboard is now used weekly by the retention team. In the first quarter of pilot usage, churn dropped by 3% in the intervention group compared to the control group.",
                learnings: [
                    "Imbalanced data handling (SMOTE) was critical for model performance.",
                    "Model interpretability (SHAP values) was key to getting stakeholder buy-in.",
                    "Deployment constraints required optimizing the model size for the container."
                ]
            }
        }
    },
    {
        title: "Loan Default Analysis",
        slug: "loan-default-analysis",
        description: "Comprehensive SQL and Python analysis of 32,000+ loan applications to identify default drivers, visualized with Power BI.",
        tags: ["SQL", "Power BI", "Risk Analysis"],
        projectType: "external-dashboard",
        category: "data-visualization",
        caseStudyEnabled: true,
        liveUrl: "http://bit.ly/46zNmiH",
        githubUrl: "https://github.com/aDataMage/Loan_Analysis_sql",
        externalBadge: "Power BI",
        technologies: ["SQL", "Power BI", "Python"],
        featured: true,
        thumbnail: "/projects/loandefault_1.png",
        caseStudy: {
            overview: {
                summary: "Analyzed a 32,000-record loan dataset to help a financial institution understand why defaults were rising in the 'home improvement' sector.",
                role: "Data Analyst",
                timeline: "4 Weeks"
            },
            problem: {
                statement: "Loan defaults increased by 5% YoY. The risk team lacked granular visibility into which demographics were driving this trend.",
                businessContext: "The bank needed to adjust its underwriting criteria but didn't want to turn away good customers unnecessarily.",
                goals: ["Identify top 3 distinct segments with high default probability", "Create a self-service dashboard for risk officers"]
            },
            methodology: {
                approach: "Interactive Dashboarding supported by rigorous SQL analysis.",
                processSteps: [
                    { title: "SQL Analysis", description: "Complex joins and window functions to calculate default rates by cohort." },
                    { title: "Power BI Design", description: "Designed an interactive report focusing on 'Drill Down' capabilities." }
                ]
            },
            results: {
                metrics: [
                    { label: "Data Processed", value: "32k Rows" },
                    { label: "Reports Generated", value: "12" }
                ],
                impact: "Identified that 'Debt Consolidation' loans for 'Renters' had a 3x higher default rate. This led to a policy change for this specific segment.",
                learnings: ["Data quality issues in the 'Employment Length' field required significant cleaning."]
            }
        }
    },
    {
        title: "Data Pipeline Toolkit",
        slug: "data-pipeline-toolkit",
        description: "A collection of reusable Python utilities for ETL workflows and data transformation.",
        tags: ["Python", "ETL", "Automation"],
        projectType: "github-only",
        category: "ai-engineering",
        caseStudyEnabled: true,
        githubUrl: "https://github.com/aDataMage/",
        externalBadge: "GitHub Repo",
        technologies: ["Python", "Pandas"],
        featured: false,
        caseStudy: {
            overview: { summary: "Internal tooling...", role: "Dev", timeline: "Ongoing" },
            problem: { statement: "Repetitive tasks...", businessContext: "Efficiency", goals: ["Automate"] },
            methodology: { approach: "Modular design", processSteps: [] },
            results: { metrics: [], impact: "High", learnings: [] }
        }
    },
    {
        title: "Automated Lead Qualifier",
        slug: "auto-lead-qualifier",
        description: "AI Agent system that processes inbound leads, scores them, and updates CRM.",
        tags: ["n8n", "OpenAI", "CRM"],
        projectType: "case-study",
        category: "ai-automation",
        caseStudyEnabled: true,
        externalBadge: "Case Study",
        technologies: ["n8n", "Node.js", "GPT-4"],
        featured: false,
        caseStudy: {
            overview: { summary: "AI Agent...", role: "Automation Engineer", timeline: "2 Weeks" },
            problem: { statement: "Slow response...", businessContext: "Sales", goals: ["Instant response"] },
            methodology: { approach: "Agentic workflow", processSteps: [] },
            results: { metrics: [], impact: "High", learnings: [] }
        }
    }
]

export const PERSONAL_INFO = {
    name: "Adejori Eniola",
    title: "Aspiring Data Scientist",
    email: "adejorieniola@gmail.com",
    github: "https://github.com/aDataMage",
    linkedin: "https://www.linkedin.com/in/adatamage/",
}
