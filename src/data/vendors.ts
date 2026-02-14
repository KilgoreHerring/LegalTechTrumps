import type { SolutionCategory } from '../types/solution'

export interface VendorLookup {
  name: string
  website: string
  logoUrl: string
  description: string
  suggestedCategory: SolutionCategory
}

export const VENDORS: VendorLookup[] = [
  // Legal AI Platforms
  { name: 'Harvey AI', website: 'https://www.harvey.ai', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=harvey.ai', description: 'AI-powered legal assistant for drafting, research, and analysis', suggestedCategory: 'legal-ai' },
  { name: 'CoCounsel (Thomson Reuters)', website: 'https://casetext.com/cocounsel', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=casetext.com', description: 'AI legal assistant built on GPT-4 for research, document review, and drafting', suggestedCategory: 'legal-ai' },
  { name: 'Luminance', website: 'https://www.luminance.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=luminance.com', description: 'AI platform for contract negotiation, review, and analysis', suggestedCategory: 'legal-ai' },
  { name: 'Spellbook', website: 'https://www.spellbook.legal', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=spellbook.legal', description: 'AI contract drafting assistant integrated with Microsoft Word', suggestedCategory: 'legal-ai' },
  { name: 'EvenUp', website: 'https://www.evenuplaw.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=evenuplaw.com', description: 'AI platform for personal injury demand generation', suggestedCategory: 'legal-ai' },
  { name: 'Paxton AI', website: 'https://www.paxton.ai', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=paxton.ai', description: 'Legal AI assistant for research, drafting, and document review', suggestedCategory: 'legal-ai' },
  { name: 'Alexsei', website: 'https://www.alexsei.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=alexsei.com', description: 'AI-powered legal research memo generation', suggestedCategory: 'legal-ai' },

  // Legal Research Platforms
  { name: 'Westlaw', website: 'https://www.westlaw.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=westlaw.com', description: 'Comprehensive legal research platform with case law, statutes, and secondary sources', suggestedCategory: 'legal-research' },
  { name: 'LexisNexis', website: 'https://www.lexisnexis.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=lexisnexis.com', description: 'Legal research and analytics platform with extensive database coverage', suggestedCategory: 'legal-research' },
  { name: 'vLex', website: 'https://www.vlex.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=vlex.com', description: 'Global legal research platform with AI-powered search', suggestedCategory: 'legal-research' },
  { name: 'Fastcase', website: 'https://www.fastcase.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=fastcase.com', description: 'Legal research platform with AI-enhanced search and analytics', suggestedCategory: 'legal-research' },
  { name: 'ROSS Intelligence', website: 'https://www.rossintelligence.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=rossintelligence.com', description: 'AI-powered legal research tool for case law analysis', suggestedCategory: 'legal-research' },
  { name: 'Practical Law (Thomson Reuters)', website: 'https://www.thomsonreuters.com/en/products-services/legal/practical-law.html', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=thomsonreuters.com', description: 'Practice-area specific legal know-how and template resources', suggestedCategory: 'legal-research' },

  // Contract Lifecycle Management
  { name: 'Ironclad', website: 'https://www.ironcladapp.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=ironcladapp.com', description: 'Digital contracting platform for creating, managing, and storing contracts', suggestedCategory: 'clm' },
  { name: 'Icertis', website: 'https://www.icertis.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=icertis.com', description: 'Enterprise contract lifecycle management platform with AI', suggestedCategory: 'clm' },
  { name: 'DocuSign CLM', website: 'https://www.docusign.com/products/clm', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=docusign.com', description: 'Contract lifecycle management with e-signature integration', suggestedCategory: 'clm' },
  { name: 'Agiloft', website: 'https://www.agiloft.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=agiloft.com', description: 'No-code CLM platform with AI-assisted contract management', suggestedCategory: 'clm' },
  { name: 'ContractPodAi', website: 'https://www.contractpodai.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=contractpodai.com', description: 'AI-powered end-to-end contract lifecycle management', suggestedCategory: 'clm' },
  { name: 'Juro', website: 'https://www.juro.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=juro.com', description: 'In-browser contract automation and management platform', suggestedCategory: 'clm' },
  { name: 'LinkSquares', website: 'https://www.linksquares.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=linksquares.com', description: 'AI-powered contract management and analytics platform', suggestedCategory: 'clm' },
  { name: 'Concord', website: 'https://www.concord.app', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=concord.app', description: 'Contract management with collaboration and e-signature', suggestedCategory: 'clm' },
  { name: 'SpotDraft', website: 'https://www.spotdraft.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=spotdraft.com', description: 'End-to-end contract lifecycle management for legal and business teams', suggestedCategory: 'clm' },

  // Document Management Systems
  { name: 'iManage', website: 'https://www.imanage.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=imanage.com', description: 'Document and email management platform for legal professionals', suggestedCategory: 'dms' },
  { name: 'NetDocuments', website: 'https://www.netdocuments.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=netdocuments.com', description: 'Cloud-native document management system for law firms', suggestedCategory: 'dms' },
  { name: 'Worldox', website: 'https://www.worldox.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=worldox.com', description: 'Document management system for small to mid-size firms', suggestedCategory: 'dms' },
  { name: 'OpenText', website: 'https://www.opentext.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=opentext.com', description: 'Enterprise information management and document management', suggestedCategory: 'dms' },

  // Document Automation
  { name: 'HotDocs', website: 'https://www.hotdocs.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=hotdocs.com', description: 'Document automation and assembly platform', suggestedCategory: 'doc-automation' },
  { name: 'Contract Express (Thomson Reuters)', website: 'https://legal.thomsonreuters.com/en/products/contract-express', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=thomsonreuters.com', description: 'Automated document drafting and self-service document creation', suggestedCategory: 'doc-automation' },
  { name: 'Documate', website: 'https://www.documate.org', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=documate.org', description: 'No-code document automation for legal workflows', suggestedCategory: 'doc-automation' },
  { name: 'Smokeball', website: 'https://www.smokeball.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=smokeball.com', description: 'Legal practice management with built-in document automation', suggestedCategory: 'doc-automation' },
  { name: 'Lawyaw', website: 'https://www.lawyaw.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=lawyaw.com', description: 'Court form and document automation for law firms', suggestedCategory: 'doc-automation' },
  { name: 'Avvoka', website: 'https://www.avvoka.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=avvoka.com', description: 'Document automation, negotiation, and analytics platform', suggestedCategory: 'doc-automation' },

  // Contract Review / AI Review
  { name: 'Kira Systems', website: 'https://www.kirasystems.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=kirasystems.com', description: 'Machine learning contract analysis and review platform', suggestedCategory: 'legal-ai' },
  { name: 'ThoughtRiver', website: 'https://www.thoughtriver.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=thoughtriver.com', description: 'AI-powered pre-screening and contract review', suggestedCategory: 'legal-ai' },
  { name: 'LegalSifter', website: 'https://www.legalsifter.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=legalsifter.com', description: 'AI contract review assistant with advisor guidance', suggestedCategory: 'legal-ai' },
  { name: 'Definely', website: 'https://www.definely.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=definely.com', description: 'Legal document drafting and review with definition navigation', suggestedCategory: 'legal-ai' },

  // E-Discovery
  { name: 'Relativity', website: 'https://www.relativity.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=relativity.com', description: 'End-to-end e-discovery platform with AI-powered analytics', suggestedCategory: 'e-discovery' },
  { name: 'Nuix', website: 'https://www.nuix.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=nuix.com', description: 'Data processing and e-discovery for investigations and compliance', suggestedCategory: 'e-discovery' },
  { name: 'Logikcull', website: 'https://www.logikcull.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=logikcull.com', description: 'Cloud-based e-discovery automation platform', suggestedCategory: 'e-discovery' },
  { name: 'Everlaw', website: 'https://www.everlaw.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=everlaw.com', description: 'Cloud-native litigation and investigation platform', suggestedCategory: 'e-discovery' },
  { name: 'DISCO', website: 'https://www.csdisco.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=csdisco.com', description: 'AI-powered legal technology for e-discovery and case management', suggestedCategory: 'e-discovery' },

  // Matter Management
  { name: 'Mitratech', website: 'https://www.mitratech.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=mitratech.com', description: 'Legal operations platform with matter management and spend analytics', suggestedCategory: 'matter-management' },
  { name: 'SimpleLegal', website: 'https://www.simplelegal.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=simplelegal.com', description: 'E-billing, matter management, and legal analytics platform', suggestedCategory: 'matter-management' },
  { name: 'Brightflag', website: 'https://www.brightflag.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=brightflag.com', description: 'AI-powered legal spend management and matter tracking', suggestedCategory: 'matter-management' },
  { name: 'Xakia', website: 'https://www.xakiatech.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=xakiatech.com', description: 'In-house legal matter management and reporting', suggestedCategory: 'matter-management' },

  // Practice Management
  { name: 'Clio', website: 'https://www.clio.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=clio.com', description: 'Cloud-based legal practice management for law firms', suggestedCategory: 'practice-management' },
  { name: 'MyCase', website: 'https://www.mycase.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=mycase.com', description: 'Practice management with client communication and billing', suggestedCategory: 'practice-management' },
  { name: 'PracticePanther', website: 'https://www.practicepanther.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=practicepanther.com', description: 'All-in-one legal practice management software', suggestedCategory: 'practice-management' },
  { name: 'Filevine', website: 'https://www.filevine.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=filevine.com', description: 'Legal work platform with case management and document automation', suggestedCategory: 'practice-management' },
  { name: 'Actionstep', website: 'https://www.actionstep.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=actionstep.com', description: 'Legal practice management with workflow automation', suggestedCategory: 'practice-management' },
  { name: 'Litify', website: 'https://www.litify.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=litify.com', description: 'Legal operating platform built on Salesforce', suggestedCategory: 'practice-management' },

  // Billing & Time Tracking
  { name: 'LEDES/eBillingHub', website: 'https://www.ebillinghub.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=ebillinghub.com', description: 'E-billing management and LEDES format support', suggestedCategory: 'billing-time' },
  { name: 'TimeSolv', website: 'https://www.timesolv.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=timesolv.com', description: 'Legal time tracking and billing software', suggestedCategory: 'billing-time' },
  { name: 'Bill4Time', website: 'https://www.bill4time.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=bill4time.com', description: 'Time tracking and billing for legal professionals', suggestedCategory: 'billing-time' },
  { name: 'CosmoLex', website: 'https://www.cosmolex.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=cosmolex.com', description: 'Practice management with built-in legal accounting and billing', suggestedCategory: 'billing-time' },

  // Compliance
  { name: 'NAVEX Global', website: 'https://www.navex.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=navex.com', description: 'Integrated risk and compliance management platform', suggestedCategory: 'compliance' },
  { name: 'SAI360', website: 'https://www.sai360.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=sai360.com', description: 'Risk and compliance learning and management platform', suggestedCategory: 'compliance' },
  { name: 'OneTrust', website: 'https://www.onetrust.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=onetrust.com', description: 'Privacy, security, and data governance platform', suggestedCategory: 'compliance' },
  { name: 'LogicGate', website: 'https://www.logicgate.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=logicgate.com', description: 'GRC process automation and risk management platform', suggestedCategory: 'compliance' },

  // Workflow & Process
  { name: 'Checkbox', website: 'https://www.checkbox.ai', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=checkbox.ai', description: 'No-code legal workflow automation platform', suggestedCategory: 'legal-ai' },
  { name: 'Josef', website: 'https://www.josef.io', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=josef.io', description: 'No-code legal automation and chatbot builder', suggestedCategory: 'doc-automation' },
  { name: 'Neota Logic', website: 'https://www.neotalogic.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=neotalogic.com', description: 'No-code platform for legal apps and workflow automation', suggestedCategory: 'doc-automation' },

  // Contract Negotiation specific
  { name: 'Synthelis', website: 'https://www.synthelis.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=synthelis.com', description: 'AI platform for contract analysis and negotiation support', suggestedCategory: 'contract-negotiation' },
  { name: 'BlackBoiler', website: 'https://www.blackboiler.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=blackboiler.com', description: 'AI-powered automated contract markup and review', suggestedCategory: 'contract-negotiation' },

  // Additional Solutions
  { name: 'Legora', website: 'https://legora.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=legora.com', description: 'AI-powered workspace for lawyers enabling document drafting, review, research, and automated workflows', suggestedCategory: 'legal-ai' },
  { name: 'StructureFlow', website: 'https://www.structureflow.co', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=structureflow.co', description: 'Visual intelligence platform for automated corporate structure diagrams, timelines, and transaction flows', suggestedCategory: 'doc-automation' },
  { name: 'Legatics', website: 'https://www.legatics.com', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=legatics.com', description: 'Transaction management platform with real-time checklists, signature management, and closing set automation', suggestedCategory: 'matter-management' },
  { name: 'DeepJudge', website: 'https://www.deepjudge.ai', logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=deepjudge.ai', description: 'Precision AI search platform for legal teams to retrieve answers from firm knowledge and data', suggestedCategory: 'legal-research' },
]

export function searchVendors(query: string): VendorLookup[] {
  if (!query || query.length < 2) return []
  const lower = query.toLowerCase()
  return VENDORS.filter(v =>
    v.name.toLowerCase().includes(lower) ||
    v.description.toLowerCase().includes(lower)
  ).slice(0, 10)
}
