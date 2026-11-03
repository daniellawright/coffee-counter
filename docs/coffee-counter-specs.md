CoffeeCounter

Complete Full-Stack Web Application and Data Engineering Development Specification

Project Name: CoffeeCounter
Tagline: Every cup counts.
Project Type: Full-stack SaaS web application and data engineering portfolio project
Primary Goal: Develop a professional coffee shop analytics platform that transforms real sales data into understandable business insights.

1. Project Overview

Develop a complete, functional, professional web application called CoffeeCounter.

CoffeeCounter is a business intelligence and analytics platform designed specifically for coffee shops.

Coffee shop owners should be able to upload their sales data, have that data automatically cleaned and processed, and access an interactive dashboard displaying useful information about their business.

The application should help coffee shop owners answer questions such as:

How much revenue did my coffee shop generate this month?

Which drinks sell the most?

What are my busiest hours?

Which days generate the most revenue?

Do customers prefer particular drinks depending on the weather?

How many drinks am I likely to sell tomorrow or next week?

How many coffee beans, milk cartons, cups, and other ingredients should I prepare?

When was my sales data last updated?

Did my data import complete successfully?

The platform must be easy to understand for people without technical knowledge.

However, the underlying application should demonstrate advanced software engineering and data engineering techniques.

This project is intended to be a professional portfolio piece for Data Engineering, Software Engineering, and Data Science internships and full-time positions.

It must showcase real experience with databases, data pipelines, SQL transformations, data validation, orchestration, cloud infrastructure, APIs, and frontend development.

The application must actually work.

Do not develop a static UI with fake functionality. Dashboard values must originate from processed data, filters must work, and file uploads must produce actual results.

2. Core Product Concept

CoffeeCounter should function as a platform that different coffee shops can use with their own data.

A business owner should be able to create an account, register their coffee shop, upload transaction records, and access personalized analytics.

Different businesses must have separate, private data.

For example:

A coffee shop called Madison Coffee Co. uses Square to process customer purchases.

At the end of the week, its owner exports transaction information from Square as a CSV file.

The owner visits CoffeeCounter, uploads the file, and maps the exported columns to the fields required by the application.

CoffeeCounter then:

Reads the uploaded file.

Validates the format and required information.

Identifies missing or incorrect values.

Cleans and standardizes the transactions.

Prevents duplicate imports.

Stores the validated information in a database.

Processes the information using SQL and data engineering workflows.

Updates the business analytics dashboard.

Displays relevant sales metrics and visualizations.

Uses the historical data for forecasting and inventory calculations where sufficient information exists.

The owner can return later and upload additional transactions.

Previously imported transactions should not be duplicated.

The application should support multiple coffee shop locations under the same business account.

3. Public Demo Experience

The initial public demo must be immediately usable with a real, preloaded coffee transaction dataset.

This is one of the highest-priority requirements.

A visitor must be able to explore CoffeeCounter without creating an account.

The homepage should prominently display two options:

Explore Demo

Opens a fully functional analytics dashboard populated with real historical coffee sales data.

Upload Your Data

Allows a visitor to try the sales import workflow without creating an account.

The demonstration must be functional, not just a collection of static screenshots.

Explore Demo

Visitors should immediately see:

Total revenue

Total transactions

Average purchase amount

Revenue trends

Bestselling drinks

Busiest hours

Sales by day of week

Product performance

Available weather insights

Available demand forecasts

Data pipeline status

All metrics must come from actual database records.

The dashboard must clearly identify the source of the dataset.

If particular information is unavailable, display a useful empty state rather than inventing values.

For example, if the dataset does not contain a verifiable store location, weather comparisons should not be fabricated.

Upload Your Data

Visitors should be able to test the import process through a temporary guest session.

The workflow must allow:

Uploading a CSV file.

Previewing its contents.

Mapping columns.

Validating records.

Processing transactions.

Viewing the resulting analytics.

Guest uploads should be isolated from the public demo and from other visitors.

Use a temporary data storage mechanism with automatic expiration and deletion.

Implement file-size limits, processing limits, and abuse prevention.

Do not permanently save a guest's business information without an account and explicit permission.

Registered users can use persistent storage for their own businesses.

4. Technology Stack

The project should showcase technologies relevant to modern data engineering jobs while maintaining a practical architecture. The project may use:

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Recharts

Doodle-style React icon library

Use the Next.js App Router.

Backend

Python

FastAPI

Pydantic

SQLAlchemy

Pandas

PyArrow

Use FastAPI for API endpoints, business logic, data ingestion coordination, and communication with the database.

Database and Data Engineering

PostgreSQL

SQL

dbt Core

Apache Airflow

Docker

Docker Compose

AWS S3

Background Processing

Use Redis and a suitable Python job queue, such as RQ, for processing uploaded files asynchronously.

Users should not have to keep an HTTP request open while large uploads are processed.

Machine Learning

scikit-learn

Python statistical libraries

Use these technologies for demand forecasting where sufficient data exists.

Development and Deployment

Git

GitHub

GitHub Actions

Vercel

Managed PostgreSQL

Python-compatible backend hosting

Optional Advanced Technologies

After the primary application is complete:

Apache Kafka for streaming transactions.

Apache Spark/PySpark for distributed historical data processing.

Terraform for infrastructure configuration.

Direct Square API integration.

These are optional extensions.

The primary product must work independently of Kafka and Spark.

Do NOT introduce unnecessary technologies just to increase the number of tools listed in the project.

5. Branding and Visual Identity

The application must follow a consistent brand identity.

Brand Name

CoffeeCounter

Tagline

Every cup counts.

Visual Direction

CoffeeCounter should combine the warm, welcoming atmosphere of a specialty coffee shop with the simplicity and professionalism of a modern SaaS analytics platform.

The interface should be minimal, refined, friendly, and highly readable.

It should feel like a real software company has designed the application.

Avoid the appearance of a generic admin dashboard.

The design should be distinctive without becoming visually complicated.

Official Color Palette

Use the following five colors throughout the application.

Color

Hexadecimal

Purpose

Espresso

#33261F

Primary text, navigation, dark backgrounds

Caramel

#C99260

Secondary accents and coffee-related highlights

Cream

#F7F3EC

Main page backgrounds

Lilac

#C4BFDF

Interactive highlights, selected states, charts

White

#FFFFFF

Cards, forms, and content surfaces

Use these exact colors.

Develop the visual identity around them.

Espresso should provide strong contrast and structure.

Cream should establish the warm background.

White should be used for important content surfaces.

Lilac should give the interface a recognizable modern technology aesthetic.

Caramel should provide subtle coffee-inspired accents.

Use espresso text on lilac surfaces to maintain readability.

Strict Visual Design Rules

Follow every rule below:

No gradients.

No emojis.

No colored borders.

No shadows.

No motion animations when hovering.

No glowing elements.

No glassmorphism.

No excessively decorative backgrounds.

No unnecessary visual effects.

No overly saturated colors outside the defined palette.

Do not add box shadows to cards, buttons, navigation bars, modals, or dropdowns.

Do not use colored outlines or colored borders to decorate components.

If a component needs separation, use whitespace, subtle neutral dividers, or contrasting backgrounds.

Hover states may change background or text color instantly, but elements must not move, scale, bounce, rotate, or animate on hover.

Maintain clearly visible keyboard focus indicators using accessible, nondecorative outlines.

Respect reduced-motion accessibility preferences.

The interface should rely on typography, whitespace, alignment, and careful composition rather than visual effects.

Icons

Use a doodle-like icon package for the application's icons.

The icons should look hand-drawn, friendly, simple, and visually consistent.

Prefer an existing React doodle icon library, such as react-doodle-icons, if it is compatible with the selected React version and satisfies project licensing requirements.

If that package is unsuitable, select an actively maintained hand-drawn icon library or use a consistent set of custom SVG doodle-style icons.

Do not use emojis as replacements for icons.

Avoid mixing unrelated icon styles.

Icons should be used for:

Navigation

Data uploads

Analytics

Products

Weather

Forecasting

Inventory

Pipeline monitoring

Settings

Empty states

Keep the icons visually simple and understandable.

Typography

Use:

Fraunces: Marketing headings, hero titles, and selected brand elements.

DM Sans: Navigation, buttons, dashboard text, tables, charts, labels, and general interface typography.

Use tabular numerals for financial metrics.

Maintain consistent font sizes, line heights, and spacing.

Avoid unnecessary font variations.

Logo

Create a professional CoffeeCounter logo.

The preferred concept combines:

The letter C

Coffee bean

A subtle reference to counting or analytics

The logo should be geometric, minimal, and recognizable.

It must work in:

Standard horizontal format

Light format

Dark format

Square application icon

Favicon

Create SVG logo assets.

The logo must remain recognizable at small sizes.

6. Website Structure

The application should contain two main experiences.

Public Website

A marketing website introducing CoffeeCounter, explaining its purpose, and allowing visitors to explore the demo or create an account.

Analytics Application

A private business intelligence workspace containing the dashboard, data imports, analytics, forecasting, inventory management, and pipeline monitoring.

The public demo should provide read-only access to a prepared analytics workspace.

Guest uploads should have their own isolated temporary workspace.

7. Landing Page

Design a beautiful, professional public homepage.

The page should feel like a real SaaS product landing page.

Navigation

Include:

CoffeeCounter logo

Features

How It Works

Explore Demo

Log In

Get Started

Navigation must be responsive.

Hero Section

Small introductory label:

COFFEE SHOP INTELLIGENCE

Main heading:

Every coffee counts!

Supporting description:

"Turn your coffee shop's sales data into meaningful insights. Understand your customers, track performance, and make smarter business decisions."

Primary button:

Explore Demo

Secondary button:

Upload Your Data

The hero should include a visual preview of the actual CoffeeCounter analytics dashboard.

This preview should accurately represent the application.

It should not rely on invented business results presented as real.

How It Works

Explain CoffeeCounter through three simple steps.

1. Upload your data

Import sales files exported from your coffee shop's POS software.

2. We organize the numbers

CoffeeCounter validates, cleans, and processes transactions automatically.

3. Discover your insights

Explore sales performance, customer purchasing trends, forecasts, and inventory recommendations.

Present these steps using clean layouts and doodle-style icons.

Features Section

Display the seven core features described in the next section.

Each feature should include:

A doodle-style icon

A simple title

A short explanation

A preview or relevant illustration where useful

Additional Sections

Include:

Dashboard preview

Benefits for coffee shop owners

Explanation of the data import workflow

Final call to action

Footer

Do not add invented testimonials, customer counts, customer logos, or unsupported performance claims.

8. Seven Core Application Features

The following seven features define the core product.

Implement each one as a functional part of CoffeeCounter.

Feature 1. Data Import

Purpose: Allow coffee shop owners to upload sales data from external software such as Square.

The application should support sales files exported by POS systems.

Start with CSV and XLSX uploads.

The import process should:

Accept the file.

Preview the contents.

Identify recognizable columns.

Allow manual column mapping.

Validate records.

Standardize dates, currencies, product names, and quantities.

Detect invalid and duplicate records.

Store valid transactions.

Report processing errors.

Refresh the analytics tables.

Different files may use different column names.

For example:

transaction_date

date

order_time

These may all represent the transaction timestamp.

Create an intuitive mapping interface.

Users should not need to modify their files manually when common differences can be handled through mapping.

Provide a clear import summary:

Total rows processed

Successfully imported records

Rejected records

Duplicate records

Processing duration

Allow users to inspect errors.

Create an import history page.

Support new files containing additional transactions without duplicating old sales.

Do not assume every POS export has identical columns.

Document supported formats and minimum required fields.

Feature 2. Business Dashboard

Purpose: Give coffee shop owners a quick overview of business performance.

Display the following main metrics:

Total Revenue

Total money earned from completed sales during the selected period.

Total Transactions

Number of completed customer orders.

Average Purchase Amount

Average revenue generated per transaction.

Sales Growth

Percentage increase or decrease compared with the previous comparable period.

Also display:

Revenue over time

Transaction volume

Top-selling drinks

Sales by product category

Busiest days

Store comparisons when multiple locations exist

Allow filtering by:

Date range

Store location

Product category

Charts and metrics must update according to the filters.

Use actual processed transaction records for calculations.

Do not hardcode values.

Feature 3. Sales Analytics

Purpose: Help owners understand customer purchasing patterns.

Analyze:

Bestselling drinks

Least popular drinks

Busiest hours

Busiest days

Product category performance

Revenue trends

Seasonal purchasing patterns

Changes in product demand

Average transaction value

Include an interactive heatmap showing transaction activity by weekday and hour.

Include charts for product popularity and historical sales trends.

Let users filter by store, date, and product.

Provide descriptive insights generated from the actual calculations.

Example:

"Iced lattes accounted for 28% of drinks sold during the selected period."

Only display statements supported by the data.

Feature 4. Weather Insights

Core question:

Does the data suggest that customers prefer certain drinks depending on the weather?

Combine historical, location-specific weather data with coffee shop product sales.

Use the store's actual location and the dates of its transactions.

Retrieve historical weather information from Open-Meteo.

Analyze relationships such as:

Temperature versus iced drink sales

Temperature versus hot drink sales

Rainfall versus purchase volume

Product preferences during warmer and colder days

Seasonal drink demand

Visualizations should include:

Scatter plots

Temperature and product sales charts

Product category comparisons

Rainy versus dry day comparisons

Allow users to filter by store and date range.

Use appropriate statistical methods to examine correlations.

Clearly distinguish correlation from causation.

For example:

"On days above 75°F, iced drinks represented a higher share of total beverage purchases."

Only display such a statement when it is supported by actual data.

If the store's location is unknown, request it before performing location-specific weather analysis.

Do not invent a geographic location for an external dataset.

Align weather observations to the store's local timezone.

Feature 5. Demand Forecasting

Purpose: Estimate future sales using historical transaction information.

Use Python and appropriate statistical or machine learning models.

The model should consider:

Historical sales volume

Day of week

Recent sales patterns

Seasonal behavior

Weather where suitable forecast data is available

Start with an understandable baseline before implementing a more sophisticated model.

The forecasting interface should display:

Predicted sales

Minimum expected sales

Maximum expected sales

Historical sales

Forecast period

Model accuracy

For example:

Tomorrow's forecast

Estimated drinks sold: 145

Lower prediction bound: 125

Upper prediction bound: 168

These numbers are illustrative. Actual values must come from the forecasting model.

Use statistically meaningful prediction intervals, such as calibrated 80% prediction intervals.

Do not generate arbitrary upper and lower bounds.

Use time-based validation instead of randomly splitting time-series data.

Evaluate forecasts with appropriate metrics such as MAE and RMSE.

Provide a clear explanation of what the prediction means.

If the business does not have enough historical data, explain why forecasting is unavailable.

Do not produce predictions that appear reliable when the data cannot support them.

Feature 6. Inventory Planning

Purpose: Estimate how much inventory a coffee shop should prepare.

Allow coffee shop owners to define ingredients and recipes.

Example recipe:

Iced Latte

Espresso beans: 18 grams

Milk: 200 milliliters

Ice: specified quantity

Cup: 1

If the demand forecast predicts 100 iced lattes, calculate the ingredients needed to fulfill that demand.

Support:

Coffee beans

Milk

Alternative milks

Syrups

Cups

Lids

Other configurable ingredients

Allow users to manage:

Ingredient names

Available inventory

Units

Recipe quantities

Supplier prices

Reorder thresholds

Display:

Current stock

Estimated consumption

Forecasted inventory requirements

Potential shortages

Suggested reorder quantities

Calculate inventory recommendations from recipes and forecasted product demand.

Do not invent ingredient requirements.

If an owner has not configured a recipe, clearly indicate that the corresponding inventory estimate cannot yet be calculated.

Feature 7. Data Pipeline Monitor

Purpose: Show users whether their information has been processed successfully.

Display:

Last successful data update

Number of records processed

Number of rejected records

Current processing status

Recent pipeline executions

Processing duration

Failed jobs

Error messages

Use understandable statuses such as:

Pending

Processing

Completed

Failed

The page should provide a simple experience for business owners while remaining technically useful.

For technical users, include additional execution details where appropriate.

Pipeline metrics must come from actual stored execution records.

Do not invent processing results or statuses.

9. Dashboard Design

Create a consistent dashboard layout.

Sidebar

Use an espresso-colored sidebar.

Navigation items:

Overview

Sales Analytics

Weather Insights

Forecasting

Inventory

Data Imports

Pipelines

Settings

Use doodle-style icons.

The selected navigation item should use lilac as its visual highlight.

Keep spacing generous and navigation readable.

On smaller screens, collapse the sidebar into a responsive menu.

Main Content Area

Use cream as the main page background.

Use white for cards and data surfaces.

Avoid shadows and decorative borders.

Use spacing, layout, and contrast to separate information.

Dashboard Header

Include:

Current business name

Store selector

Date range selector

Data freshness indicator

User account menu

Analytics Cards

Cards should use:

White backgrounds

Readable dark text

Clear metric labels

Large numerical values

Small supporting descriptions

Consistent spacing

Avoid excessive visual clutter.

Charts

Use Recharts.

Chart styling should match the CoffeeCounter brand.

Use espresso, caramel, and lilac thoughtfully.

Charts must have:

Descriptive titles

Clearly labeled axes

Appropriate units

Readable legends

Tooltips

Functional filters

Useful empty states

Avoid unnecessary animations.

10. Real Data Requirements

The project should prioritize genuine historical data.

Primary Demo Dataset

Use the publicly available coffee sales dataset:

Coffee Sales by Yaroslav Isaienkov

Source:

https://www.kaggle.com/datasets/ihelon/coffee-sales

The author describes the dataset as containing actual coffee vending machine sales.

Use this dataset as the primary candidate for the preloaded public demo.

Before implementation:

Inspect the available files.

Verify the columns.

Inspect the values and date range.

Review licensing and redistribution permissions.

Document the source.

Identify any missing information.

Do not invent missing fields.

Do not claim the dataset represents a traditional coffee shop if it actually comes from a vending machine.

Do not automatically assign it a city or geographical location.

If the data contains identifiers that could be sensitive, remove or anonymize them where appropriate.

If redistribution of raw records is restricted, create a permitted setup procedure or another compliant data distribution strategy.

If direct downloading is unavailable, implement a setup script that accepts a manually provided copy.

The public demo must clearly describe its dataset.

Synthetic data may be used for automated testing, local development, or clearly labeled demonstrations.

Do not present synthetic transactions as real customer purchases.

Weather Dataset

Use Open-Meteo.

Retrieve historical temperature and precipitation information for known store locations.

If the primary demo's real-world location cannot be verified, do not fabricate weather-based sales insights for that dataset.

The application should still support weather analysis for businesses that supply their real locations.

Data Source Documentation

Document:

Source name

Source URL

Dataset description

Date range

Available fields

Limitations

Licensing or attribution requirements

11. Data Engineering Architecture

Build an end-to-end data pipeline that connects uploaded files to the analytics application.

The primary architecture should follow this process:

Sales Files / External APIs

↓

Python Data Ingestion

↓

Raw Data Storage

↓

PostgreSQL Staging Tables

↓

dbt SQL Transformations

↓

Analytics Data Models

↓

FastAPI Backend

↓

Next.js Dashboard

Apache Airflow should coordinate scheduled batch processing.

A separate background job worker should handle user uploads.

Data Ingestion

Create reusable Python modules that:

Read source files.

Validate schemas.

Standardize records.

Handle unexpected values.

Log processing errors.

Store raw information.

Load validated data into PostgreSQL.

Implement retry logic where appropriate.

Raw Storage

Preserve original files separately from transformed records.

Use local storage or an S3-compatible service during development.

Support AWS S3 for cloud storage.

Maintain source metadata and ingestion timestamps.

SQL Transformations

Use SQL extensively.

Implement transformations for:

Cleaning records

Deduplication

Date normalization

Product categorization

Order aggregation

Revenue calculations

Product popularity

Daily performance

Weather enrichment

Avoid putting every analytics calculation inside frontend components.

Perform consistent calculations in reusable database models.

Idempotency

Repeatedly processing the same import must not duplicate transactions.

Define reliable transaction identifiers and import identifiers.

If an original file does not contain stable transaction IDs, implement a documented fallback strategy.

Do not incorrectly merge distinct purchases merely because their timestamps and amounts are identical.

Data Quality

Include automated checks for:

Required fields

Unique IDs

Valid foreign keys

Accepted transaction statuses

Invalid quantities

Invalid monetary amounts

Missing timestamps

Reconciliation of raw and transformed totals

Record failures and make them inspectable.

12. PostgreSQL Database

Create a normalized relational database.

Design the schema for a multi-tenant SaaS application.

Suggested tables:

Authentication and Businesses

users

organizations

organization_members

stores

Sales Information

products

orders

order_items

raw_transactions

import_batches

import_errors

External Data

weather_observations

Inventory

ingredients

recipes

recipe_ingredients

inventory_levels

Analytics

daily_sales

product_sales

sales_forecasts

Pipeline Monitoring

pipeline_runs

pipeline_errors

Use appropriate:

Primary keys

Foreign keys

Indexes

Constraints

Timestamps

Organization identifiers

Define transaction grain clearly.

Handle completed orders, refunds, cancellations, discounts, and taxes consistently.

Use precise numeric types for money or integer minor units.

Consider timezone handling carefully.

Use database migrations for schema changes.

Document the database architecture.

13. dbt Transformations

Use dbt Core for SQL-based data transformation and testing.

Create a structured dbt project containing three primary layers.

Staging

Standardize raw source data.

Examples:

stg_orders

stg_order_items

stg_products

stg_weather

Intermediate

Combine and enrich cleaned data.

Examples:

int_sales_enriched

int_sales_weather

int_product_performance

Analytics Marts

Create reporting tables consumed by the application.

Examples:

mart_daily_sales

mart_hourly_sales

mart_product_popularity

mart_store_performance

Implement dbt schema tests.

Document model definitions and relationships.

Ensure analytics models remain organization-specific.

Support incremental processing where useful.

Do not expose raw sensitive records in public analytics views.

14. Apache Airflow

Use Apache Airflow for scheduling and orchestrating batch pipelines.

Create DAGs for:

Historical dataset ingestion

Weather data ingestion

dbt transformations

Data quality checks

Analytics refreshes

Each DAG should include:

Clear task dependencies

Logging

Retries

Failure handling

Execution status

Start and end timestamps

Provide a local Airflow setup through Docker Compose.

Do not require Airflow to handle every individual interactive user upload.

Interactive file processing should use the background job system.

Airflow should primarily manage scheduled and batch-oriented workflows.

15. FastAPI Backend

Create a production-oriented FastAPI backend.

Implement organized route handlers, services, database access, and Pydantic schemas.

Suggested API functionality:

Accounts

User authentication

User profile

Organization management

Store management

Imports

Upload sales file

Preview file

Map columns

Validate dataset

Start processing

Retrieve processing status

Retrieve import history

Dashboard

Retrieve KPIs

Retrieve revenue trends

Retrieve transaction counts

Retrieve product summaries

Sales Analytics

Retrieve sales history

Retrieve busiest hours

Retrieve product rankings

Retrieve category performance

Weather

Retrieve historical weather

Retrieve sales-weather comparisons

Forecasting

Generate forecasts

Retrieve forecasts

Retrieve evaluation metrics

Inventory

Manage ingredients

Manage recipes

Retrieve estimated inventory requirements

Pipelines

Retrieve pipeline runs

Retrieve execution status

Retrieve error summaries

Use a consistent API response format.

Implement pagination for larger result sets.

Validate every request.

Enforce authorization on private data.

Generate API documentation automatically.

16. Authentication and Data Security

Implement secure authentication using an established authentication provider or library.

Users should be able to:

Register

Sign in

Sign out

Manage basic account settings

Create a business

Add store locations

Ensure strict separation between different businesses.

A user must not be able to access another organization's private transactions simply by changing an API parameter.

Enforce access restrictions at the backend and database query levels.

Where appropriate, use PostgreSQL Row-Level Security as an additional protection.

Never expose private database credentials in browser code.

Use environment variables for secrets.

Protect file uploads from malicious content and excessive resource consumption.

Do not collect unnecessary customer personal information.

Do not store credit card numbers or other sensitive payment credentials.

Use secure handling and expiration for guest uploads.

17. Demand Forecasting Implementation

Implement demand forecasting in Python.

Start with a baseline such as historical weekday averages.

Then evaluate a more sophisticated model if justified.

Use features such as:

Day of week

Historical order counts

Recent demand

Seasonal patterns

Weather information when available and appropriate

Use time-series validation.

Avoid training on future information.

Calculate forecast evaluation metrics.

Provide predicted minimum and maximum values using a meaningful prediction interval method.

Forecasts should support daily demand.

If sufficient transaction and recipe data is available, also support product-level demand predictions.

Store model outputs and relevant metadata.

Expose predictions through the API.

The frontend must clearly explain the forecast.

18. Inventory Calculation Implementation

Allow users to enter recipes and ingredient quantities.

Use forecasted drink demand to estimate ingredient consumption.

For example:

If an iced latte requires 18 grams of coffee beans and the forecast predicts 100 iced lattes, calculate the coffee beans required for those drinks.

Support conversion between compatible units when necessary.

Do not combine incompatible units.

Allow users to specify package sizes and reorder thresholds.

Calculate:

Expected ingredient usage

Remaining inventory

Expected shortages

Reorder recommendations

Use lower and upper demand forecasts where useful to communicate uncertainty.

Explain that recommendations depend on the quality of sales forecasts and recipe information.

19. Frontend Functionality

Every button, filter, form, and navigation element should work.

Do not create decorative controls that pretend to be interactive.

Implement:

Responsive navigation

Date range filters

Store selectors

Product filters

Search where appropriate

Interactive charts

Functional file uploads

Column mapping

Processing status

Import error reporting

Form validation

Loading states

Empty states

Error messages

Success confirmations

Account settings

Accessible keyboard navigation

Use clear and friendly language.

Avoid exposing unnecessary technical terminology to coffee shop owners.

For example, prefer:

"Your sales data is being processed."

Instead of:

"ETL transformation execution pending."

Technical details can appear in expandable sections or the Pipelines page.

20. Recommended Application Routes

Implement the following frontend structure:

/

Public landing page.

/demo

Public demo analytics dashboard.

/upload

Guest upload workflow.

/login

Authentication.

/register

Account registration.

/dashboard

Authenticated business dashboard.

/dashboard/sales

Sales analytics.

/dashboard/weather

Weather insights.

/dashboard/forecast

Demand forecasting.

/dashboard/inventory

Inventory planning.

/dashboard/imports

Data imports and processing history.

/dashboard/pipelines

Pipeline monitoring.

/dashboard/settings

Business and account settings.

Use reusable layouts and components.

Avoid duplicating page structures unnecessarily.

21. Repository Structure

Organize the project approximately as follows:

CoffeeCounter/
|
|-- frontend/
|   |-- app/
|   |-- components/
|   |-- lib/
|   |-- public/
|   |-- styles/
|
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |-- models/
|   |   |-- schemas/
|   |   |-- services/
|   |   |-- core/
|   |-- migrations/
|
|-- pipeline/
|   |-- ingestion/
|   |-- validation/
|   |-- forecasting/
|   |-- datasets/
|
|-- transforms/
|   |-- models/
|   |   |-- staging/
|   |   |-- intermediate/
|   |   |-- marts/
|   |-- tests/
|
|-- airflow/
|   |-- dags/
|
|-- infra/
|   |-- docker/
|   |-- aws/
|
|-- tests/
|
|-- docs/
|   |-- architecture/
|   |-- screenshots/
|
|-- .github/
|   |-- workflows/
|
|-- compose.yaml
|-- .env.example
|-- .gitignore
|-- README.md

Adjust the structure if a simpler organization would improve maintainability.

22. Development Environment

The application should be developed on Windows using VS Code, with WSL2 and Docker Desktop available for local infrastructure.

Create clear installation instructions.

Document prerequisites such as:

Python

Node.js

Docker Desktop

WSL2

Git

Set up a Docker Compose development environment.

Provide services for:

PostgreSQL

Redis

Background worker

FastAPI

Next.js

Airflow when required

Keep the development setup practical.

Use an .env.example file showing required environment variables.

Never commit actual credentials.

Provide scripts to:

Start the application

Initialize the database

Run migrations

Load the demo dataset

Run dbt models

Run tests

Stop the services

Document each command.

The development environment should not require paid cloud services.

23. Testing and Quality Assurance

Implement automated tests throughout development.

Backend Tests

Use pytest.

Test:

File validation

Column mapping

Transaction parsing

Duplicate detection

Data cleaning

API behavior

Authorization

Forecast calculations

Inventory calculations

Database Tests

Test:

Constraints

Foreign keys

Unique identifiers

Data integrity

Revenue reconciliation

Organization isolation

dbt Tests

Test:

Unique records

Non-null identifiers

Valid relationships

Accepted values

Transformation correctness

Frontend Tests

Test:

Navigation

Dashboard rendering

Filters

Upload interactions

Empty states

Error messages

End-to-End Tests

Use Playwright or an equivalent tool for critical workflows.

At minimum, test:

A visitor opening the public demo.

A guest uploading a valid CSV.

A user mapping columns.

A user receiving validation errors.

A successful import updating analytics.

A registered user accessing only their business information.

Configure GitHub Actions to run appropriate tests and build checks.

Do not report tests as passed unless they were actually executed successfully.

24. Deployment

Prepare CoffeeCounter for public deployment.

The deployed application must function without requiring my personal computer to remain on.

Suggested architecture:

Frontend: Vercel

Database: Managed PostgreSQL

Backend: Python-compatible hosting platform

Background Worker: Hosted worker service

Raw Storage: AWS S3

Scheduled Data Tasks: Suitable cloud scheduler or GitHub Actions for lightweight jobs

The complete application should support:

Public access to the landing page

Public demo access

Temporary guest uploads

Account registration

Private business dashboards

Persistent storage for registered users

Functional background processing

API requests

Data visualization

Keep hosting costs low.

Explain potential cloud charges before configuring paid infrastructure.

Do not expose private services publicly.

Use secure environment variables.

Provide deployment instructions.

Local Airflow orchestration may remain separate from the lightweight hosted scheduler.

Document this distinction accurately.

25. README and Portfolio Documentation

Create a polished GitHub README.

Include:

CoffeeCounter name and tagline.

Short product description.

Features.

Screenshots.

Technology stack.

Architecture diagram.

Explanation of the data pipeline.

Database schema.

Data sources.

Local installation instructions.

Running tests.

Deployment instructions.

Important design decisions.

Limitations.

Future improvements.

Explain the data engineering process in an understandable way.

For example:

"CoffeeCounter uses Python to ingest transaction data, PostgreSQL to store it, dbt to transform raw records into reporting tables, and Apache Airflow to orchestrate recurring data processing jobs. The results are delivered through a FastAPI backend to an interactive Next.js dashboard."

Also document:

Idempotent ingestion

Data quality validation

Data lineage

Batch orchestration

Database modeling

Forecast evaluation

Multi-tenant data isolation

Include an architecture diagram that clearly shows how data moves from an uploaded sales file to the final dashboard.

The documentation should make the technical depth of the project apparent to recruiters.

26. Development Milestones

Develop the application in practical, testable stages.

Milestone 1. Project Foundation and Branding

Implement:

Repository structure

Next.js project

TypeScript configuration

Tailwind configuration

CoffeeCounter brand palette

Typography

Doodle-style icon system

SVG logo

Reusable UI components

Responsive landing page

Dashboard layout

Docker PostgreSQL configuration

The landing page must use the specified CoffeeCounter branding and design rules.

Milestone 2. Real Dataset and Analytics

Implement:

Download or documented import of the real coffee sales dataset

Dataset inspection and validation

PostgreSQL schema

Python ingestion scripts

Initial SQL transformations

Public demo dashboard

Revenue metrics

Sales charts

Product analytics

The demo must display data from actual database records.

Milestone 3. User Data Import

Implement:

FastAPI upload endpoints

CSV support

XLSX support

File preview

Column mapping

Data validation

Duplicate prevention

Import history

Background processing

Guest upload experience

Users must be able to upload a real sales file and see accurate results.

Milestone 4. Accounts and Multi-Tenant Support

Implement:

Authentication

Organization accounts

Business profiles

Multiple locations

Private datasets

Secure authorization

Persistent user imports

Test organization-level isolation.

Milestone 5. Automated Data Engineering

Implement:

dbt staging models

dbt analytics marts

dbt tests

Apache Airflow DAGs

Data quality monitoring

Scheduled ingestion

Data pipeline monitoring page

Verify pipeline execution and error handling.

Milestone 6. Weather Analytics

Implement:

Store location configuration

Open-Meteo integration

Historical weather storage

Weather and sales transformations

Weather Insights page

Statistical comparisons

Only display insights supported by the available data.

Milestone 7. Forecasting

Implement:

Historical demand analysis

Baseline forecast model

Improved model when justified

Model evaluation

Lower and upper prediction bounds

Forecast visualizations

Verify predictions and uncertainty calculations.

Milestone 8. Inventory Planning

Implement:

Ingredient management

Recipe configuration

Inventory levels

Forecast-based consumption

Shortage detection

Reorder suggestions

Test unit conversions and inventory calculations.

Milestone 9. Deployment and Polish

Implement:

Public deployment

Hosted database

Hosted backend and background processing

Production environment configuration

Automated tests

CI workflows

Documentation

Screenshots

Accessibility improvements

Final UI refinements

Ensure the public demo is immediately usable.

Milestone 10. Optional Advanced Features

After all core functionality is working, consider:

Kafka event streaming

PySpark historical data processing

Direct Square integrations

Terraform infrastructure

Advanced forecasting models

These features should add genuine technical value rather than unnecessary complexity.

27. Engineering and Design Quality Requirements

Follow these requirements throughout development.

Functional Requirements

The application must contain genuine backend functionality.

Data imports must persist and process records.

Dashboard charts must use database-backed information.

Filters must modify actual queries or calculations.

Data quality errors must be visible.

Forecasts must come from implemented statistical models.

Inventory estimates must use configured recipes.

Pipeline monitoring must reflect actual execution results.

The public demo must use a properly attributed real dataset.

Design Requirements

Follow the exact five-color CoffeeCounter palette.

Use Lilac #C4BFDF as the main interactive accent.

Use doodle-style icons consistently.

Do not use gradients.

Do not use emojis.

Do not use colored borders.

Do not use shadows.

Do not use hover motion animations.

Use Fraunces and DM Sans.

Maintain a clean, warm, minimal visual identity.

Ensure responsive and accessible layouts.

Code Quality Requirements

Use TypeScript for frontend code.

Use type hints in Python.

Use reusable components and services.

Keep business logic separate from presentation logic.

Implement meaningful error handling.

Validate inputs.

Write automated tests.

Document architectural decisions.

Avoid unnecessary abstractions.

Keep the project reproducible.

Data Integrity Requirements

Do not fabricate real-world data.

Do not describe synthetic data as genuine transactions.

Do not invent store locations.

Do not assume missing dataset fields exist.

Do not display unsupported weather conclusions.

Do not generate arbitrary forecast intervals.

Do not calculate inventory requirements without recipes.

Do not double-count imported sales.

Do not expose one business's data to another.

28. Instructions for Claude Code

You are responsible for building this project in the current repository.

Assume this is a new project and no implementation exists unless repository inspection shows otherwise.

Begin by inspecting the project directory.

Use this document as the complete source of project requirements.

First:

Identify the required software and dependencies.

Choose current stable, compatible package versions.

Establish the repository structure.

Define the initial architecture.

Define the database schema and core data models.

Establish the CoffeeCounter design system.

Begin implementing Milestone 1.

After preparing the architecture, proceed to writing actual code.

Do not stop at a conceptual plan.

Create the application files and configuration.

Install necessary dependencies where supported.

Run the available checks and fix errors.

Maintain a functioning application after each milestone.

Do not attempt to implement every advanced feature before the core application works.

Prioritize a complete, reliable minimum viable product.

When external API credentials, datasets, or services are unavailable, implement the appropriate integration and document exactly what is required to activate it.

Do not invent credentials or pretend unavailable services were successfully configured.

Do not falsely report unfinished functionality as completed.

At the conclusion of each milestone, provide:

What was implemented.

Which files were created or modified.

Which commands were executed.

Which tests passed or failed.

How to run the current application.

What remains for the next milestone.

Keep the repository organized and the application working.

Use sound engineering judgment where implementation details are not explicitly specified.

Avoid unnecessary clarification questions when reasonable technical defaults are available.

29. Final Product Expectations

CoffeeCounter should ultimately feel like a real, commercially viable software product for independent coffee shops.

A coffee shop owner should be able to visit the website, understand its purpose, upload transaction data, and discover valuable business insights without knowing anything about data engineering.

A recruiter should be able to inspect the GitHub repository and recognize a substantial project demonstrating:

Python programming

SQL development

PostgreSQL database design

Data ingestion

ETL/ELT pipelines

Data validation

dbt transformations

Apache Airflow orchestration

Docker containerization

Cloud infrastructure

API development

React and Next.js

TypeScript

Data visualization

Statistical forecasting

Automated testing

Software architecture

The finished application must combine strong software engineering, reliable data processing, and an exceptionally polished user interface.

The brand should be warm, recognizable, minimal, and consistent.

The dashboard should be useful, accurate, and understandable.

The underlying data engineering system should be reproducible, observable, and thoroughly documented.

Project: CoffeeCounter

Tagline: Every cup counts!

Primary objective: Turn real coffee shop transaction data into clear, actionable business intelligence through a modern, professionally engineered web application.

Begin development with Milestone 1.