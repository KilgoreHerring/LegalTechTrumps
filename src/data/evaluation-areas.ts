import type { EvaluationAreaId } from '../types/solution'

export interface FeatureDefinition {
  id: string
  label: string
  description: string
}

export interface EvaluationAreaDefinition {
  id: EvaluationAreaId
  label: string
  features: FeatureDefinition[]
}

export const EVALUATION_AREAS: EvaluationAreaDefinition[] = [
  {
    id: 'contract-doc-review',
    label: 'Contract and Document Review',
    features: [
      { id: 'ai-clause-id', label: 'AI-Powered Clause Identification', description: 'Ability to automatically identify and extract specific clauses from documents' },
      { id: 'risk-flagging', label: 'Risk Flagging & Highlighting', description: 'Capability to flag and highlight potential risks in documents' },
      { id: 'redlining', label: 'Redlining & Comparison', description: 'Tools for marking up changes and comparing document versions' },
      { id: 'metadata-extraction', label: 'Metadata Extraction Accuracy', description: 'Precision of extracting metadata like dates, parties, and key terms' },
      { id: 'bulk-processing', label: 'Bulk Document Processing', description: 'Ability to process large volumes of documents efficiently' },
      { id: 'custom-playbook', label: 'Custom Playbook/Template Support', description: 'Support for user-defined review playbooks and templates' },
      { id: 'version-control', label: 'Version Control & Tracking', description: 'Document versioning and change tracking capabilities' },
      { id: 'ease-verification', label: 'Ease of Verification & Source Location', description: 'How easily users can verify AI outputs and locate source text' },
      { id: 'collaboration', label: 'Collaboration Features', description: 'Permissions, roles, comments, and task allocation capabilities' },
      { id: 'export-reporting', label: 'Export & Reporting', description: 'Options for exporting data and generating reports' },
      { id: 'dashboards', label: 'Dashboards & Visuals', description: 'Visual dashboards for review progress and analytics' },
    ],
  },
  {
    id: 'legal-research',
    label: 'Legal Research',
    features: [
      { id: 'db-comprehensiveness', label: 'Database Comprehensiveness', description: 'Breadth of case law, statutes, and regulations coverage' },
      { id: 'search-precision', label: 'Search Precision & Relevance', description: 'Accuracy and relevance of search results' },
      { id: 'nlp-query', label: 'Natural Language Query Support', description: 'Ability to search using plain language questions' },
      { id: 'citation-checking', label: 'Citation Checking & Validation', description: 'Tools for verifying and validating legal citations' },
      { id: 'jurisdictional-coverage', label: 'Jurisdictional Coverage', description: 'Number and depth of jurisdictions covered' },
      { id: 'update-frequency', label: 'Update Frequency & Currency', description: 'How frequently the database is updated with new content' },
      { id: 'research-history', label: 'Research History & Saved Searches', description: 'Ability to save and revisit past research sessions' },
      { id: 'annotation-tools', label: 'Annotation & Note-Taking', description: 'Built-in tools for annotating and taking notes on research' },
      { id: 'secondary-sources', label: 'Secondary Source Availability', description: 'Access to treatises, law reviews, and other secondary materials' },
    ],
  },
  {
    id: 'contract-negotiation',
    label: 'Contract Negotiation',
    features: [
      { id: 'real-time-collab', label: 'Real-Time Collaboration', description: 'Live editing and collaboration capabilities' },
      { id: 'suggested-language', label: 'Suggested Alternative Language', description: 'AI-powered suggestions for alternative clause wording' },
      { id: 'negotiation-tracking', label: 'Negotiation Tracking & Audit Trails', description: 'Comprehensive tracking of negotiation history and changes' },
      { id: 'position-comparison', label: 'Position Comparison Views', description: 'Visual comparison of different negotiating positions' },
      { id: 'clause-library', label: 'Clause Library & Fallback Positions', description: 'Repository of pre-approved clauses and fallback language' },
      { id: 'risk-scoring', label: 'Risk Scoring During Negotiation', description: 'Real-time risk assessment as terms change' },
      { id: 'legal-comms', label: 'Legal-Only Communication Features', description: 'Privileged communication channels for legal team only' },
      { id: 'approval-workflow', label: 'Approval Workflow Management', description: 'Structured approval processes and routing' },
      { id: 'version-comparison', label: 'Version Comparison Clarity', description: 'Clarity of tools for comparing document versions' },
      { id: 'template-suggestions', label: 'Template & Precedent Suggestions', description: 'Smart suggestions based on templates and precedent' },
    ],
  },
  {
    id: 'contract-management',
    label: 'Contract Management',
    features: [
      { id: 'contract-repository', label: 'Contract Repository', description: 'Central storage and organization of all contracts' },
      { id: 'obligation-tracking', label: 'Obligation & Milestone Tracking', description: 'Tracking of contractual obligations and key milestones' },
      { id: 'renewal-alerts', label: 'Renewal & Expiration Alerts', description: 'Automated notifications for upcoming renewals and expirations' },
      { id: 'permission-controls', label: 'Permission & Access Controls', description: 'Granular access control and permission management' },
      { id: 'custom-fields', label: 'Custom Field Capabilities', description: 'Ability to create custom data fields and metadata' },
      { id: 'search-filtering', label: 'Advanced Search & Filtering', description: 'Powerful search and filtering across the contract repository' },
      { id: 'reporting-analytics', label: 'Reporting & Analytics Dashboards', description: 'Built-in analytics and reporting capabilities' },
      { id: 'amendment-mgmt', label: 'Amendment & Addendum Management', description: 'Tools for managing contract amendments and addenda' },
      { id: 'counterparty-mgmt', label: 'Counterparty Management', description: 'Tracking and managing information about contract counterparties' },
      { id: 'lifecycle-visibility', label: 'Contract Lifecycle Visibility', description: 'End-to-end visibility of contracts through their lifecycle' },
      { id: 'template-automation', label: 'Template Automation', description: 'Automated generation of contracts from templates' },
    ],
  },
  {
    id: 'doc-automation',
    label: 'Document Automation',
    features: [
      { id: 'template-creation', label: 'Template Creation & Customisation', description: 'Tools for creating and customising document templates' },
      { id: 'conditional-logic', label: 'Conditional Logic Complexity', description: 'Support for complex conditional logic in templates' },
      { id: 'data-integration', label: 'Data Source Integration', description: 'Integration with CRMs, databases, and other data sources' },
      { id: 'question-flow', label: 'Question Flow Design', description: 'Flexibility in designing interview/question workflows' },
      { id: 'output-formats', label: 'Output Format Options', description: 'Support for Word, PDF, and other output formats' },
      { id: 'branding-control', label: 'Branding & Formatting Control', description: 'Control over document branding, styling, and formatting' },
      { id: 'approval-routing', label: 'Approval Routing Automation', description: 'Automated routing for document approvals' },
      { id: 'template-library', label: 'Template Library Management', description: 'Organization and management of template libraries' },
      { id: 'multi-doc-gen', label: 'Multi-Document Generation', description: 'Ability to generate multiple related documents at once' },
      { id: 'error-handling', label: 'Error Handling & Validation', description: 'Input validation and error handling during document generation' },
      { id: 'complex-calculations', label: 'Complex Calculations & Numbers', description: 'Support for mathematical calculations and number formatting' },
    ],
  },
  {
    id: 'workflow-process',
    label: 'Workflow & Process Management',
    features: [
      { id: 'workflow-builder', label: 'Workflow Builder Intuitiveness', description: 'Ease of use and intuitiveness of the workflow builder' },
      { id: 'deadline-automation', label: 'Deadline & Reminder Automation', description: 'Automated deadline tracking and reminder notifications' },
      { id: 'status-dashboards', label: 'Status Visibility & Dashboards', description: 'Real-time status dashboards and visibility tools' },
      { id: 'conditional-routing', label: 'Conditional Routing Capabilities', description: 'Ability to route tasks based on conditions and rules' },
      { id: 'tool-integration', label: 'Integration with Existing Tools', description: 'Compatibility and integration with other tools in the stack' },
      { id: 'process-analytics', label: 'Process Analytics & Optimisation', description: 'Analytics for measuring and optimising process efficiency' },
      { id: 'role-permissions', label: 'Role-Based Permissions', description: 'Permission management based on user roles' },
      { id: 'relational-db', label: 'Relational Database & Cross-Connections', description: 'Ability to create relational links between different data entities' },
    ],
  },
]

export const EVALUATION_AREA_MAP = Object.fromEntries(
  EVALUATION_AREAS.map(a => [a.id, a])
) as Record<EvaluationAreaId, EvaluationAreaDefinition>
