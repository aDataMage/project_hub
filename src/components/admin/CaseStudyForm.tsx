"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type ProjectCategory = 'data-science' | 'data-visualization' | 'ai-automation' | 'ai-engineering'

interface CaseStudyFormProps {
    category: ProjectCategory
    value: any
    onChange: (value: any) => void
}

// Collapsible section
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 bg-muted/30 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span className="font-medium">{title}</span>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {isOpen && <div className="p-4 space-y-4">{children}</div>}
        </div>
    )
}

// Basic input field
function Field({ label, value, onChange, placeholder = "", multiline = false, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean; type?: string
}) {
    const cls = "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            {multiline ? (
                <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} min-h-[80px]`} />
            ) : (
                <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
            )}
        </div>
    )
}

// String list field
function ListField({ label, value, onChange, placeholder = "Add item..." }: {
    label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string
}) {
    const [newItem, setNewItem] = useState("")
    const add = () => { if (newItem.trim()) { onChange([...(value || []), newItem.trim()]); setNewItem("") } }
    const remove = (i: number) => onChange((value || []).filter((_, idx) => idx !== i))
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div className="space-y-2">
                {(value || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="flex-1 px-3 py-2 bg-muted/30 rounded text-sm">{item}</span>
                        <button type="button" onClick={() => remove(i)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())} placeholder={placeholder} className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                    <Button type="button" size="sm" variant="outline" onClick={add}><Plus className="h-4 w-4" /></Button>
                </div>
            </div>
        </div>
    )
}

// Process steps
function ProcessStepsField({ value, onChange, showAutomation = false }: {
    value: { title: string; description: string; automation?: string }[]; onChange: (v: any[]) => void; showAutomation?: boolean
}) {
    const add = () => onChange([...(value || []), { title: "", description: "", automation: "" }])
    const update = (i: number, field: string, val: string) => { const u = [...(value || [])]; u[i] = { ...u[i], [field]: val }; onChange(u) }
    const remove = (i: number) => onChange((value || []).filter((_, idx) => idx !== i))
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Process Steps</label>
            <div className="space-y-3">
                {(value || []).map((step, i) => (
                    <div key={i} className="p-3 bg-muted/20 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-muted-foreground">Step {i + 1}</span>
                            <button type="button" onClick={() => remove(i)} className="text-red-500"><Trash2 className="h-3 w-3" /></button>
                        </div>
                        <input type="text" value={step.title || ""} onChange={(e) => update(i, 'title', e.target.value)} placeholder="Step title" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                        <textarea value={step.description || ""} onChange={(e) => update(i, 'description', e.target.value)} placeholder="Description" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm min-h-[60px]" />
                        {showAutomation && <input type="text" value={step.automation || ""} onChange={(e) => update(i, 'automation', e.target.value)} placeholder="Automation details" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />}
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={add}><Plus className="h-4 w-4 mr-1" /> Add Step</Button>
            </div>
        </div>
    )
}

// Metrics field
function MetricsField({ value, onChange, showImprovement = false }: {
    value: { label: string; value: string; improvement?: string }[]; onChange: (v: any[]) => void; showImprovement?: boolean
}) {
    const add = () => onChange([...(value || []), { label: "", value: "", improvement: "" }])
    const update = (i: number, field: string, val: string) => { const u = [...(value || [])]; u[i] = { ...u[i], [field]: val }; onChange(u) }
    const remove = (i: number) => onChange((value || []).filter((_, idx) => idx !== i))
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Metrics</label>
            <div className="space-y-2">
                {(value || []).map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input type="text" value={m.label || ""} onChange={(e) => update(i, 'label', e.target.value)} placeholder="Label" className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                        <input type="text" value={m.value || ""} onChange={(e) => update(i, 'value', e.target.value)} placeholder="Value" className="w-24 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                        {showImprovement && <input type="text" value={m.improvement || ""} onChange={(e) => update(i, 'improvement', e.target.value)} placeholder="↑/↓" className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-sm" />}
                        <button type="button" onClick={() => remove(i)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={add}><Plus className="h-4 w-4 mr-1" /> Add Metric</Button>
            </div>
        </div>
    )
}

// Challenges field
function ChallengesField({ value, onChange }: { value: { issue: string; solution: string }[]; onChange: (v: any[]) => void }) {
    const add = () => onChange([...(value || []), { issue: "", solution: "" }])
    const update = (i: number, field: string, val: string) => { const u = [...(value || [])]; u[i] = { ...u[i], [field]: val }; onChange(u) }
    const remove = (i: number) => onChange((value || []).filter((_, idx) => idx !== i))
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Challenges & Solutions</label>
            <div className="space-y-3">
                {(value || []).map((c, i) => (
                    <div key={i} className="p-3 bg-muted/20 rounded-lg space-y-2">
                        <div className="flex justify-end"><button type="button" onClick={() => remove(i)} className="text-red-500"><Trash2 className="h-3 w-3" /></button></div>
                        <textarea value={c.issue || ""} onChange={(e) => update(i, 'issue', e.target.value)} placeholder="Challenge/Issue" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                        <textarea value={c.solution || ""} onChange={(e) => update(i, 'solution', e.target.value)} placeholder="Solution" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={add}><Plus className="h-4 w-4 mr-1" /> Add Challenge</Button>
            </div>
        </div>
    )
}

// Helper to update nested value
const useUpdate = (value: any, onChange: (v: any) => void) => {
    const update = (section: string, field: string, val: any) => {
        onChange({ ...value, [section]: { ...(value?.[section] || {}), [field]: val } })
    }
    const updateSection = (section: string, val: any) => {
        onChange({ ...value, [section]: val })
    }
    return { update, updateSection }
}

// ========== DATA SCIENCE FORM ==========
function DataScienceForm({ value, onChange }: { value: any; onChange: (v: any) => void }) {
    const { update } = useUpdate(value, onChange)
    return (
        <div className="space-y-4">
            <Section title="Overview" defaultOpen={true}>
                <Field label="Summary" value={value?.overview?.summary} onChange={(v) => update('overview', 'summary', v)} multiline placeholder="Project summary..." />
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Role" value={value?.overview?.role} onChange={(v) => update('overview', 'role', v)} placeholder="e.g., Lead Data Scientist" />
                    <Field label="Timeline" value={value?.overview?.timeline} onChange={(v) => update('overview', 'timeline', v)} placeholder="e.g., 8 Weeks" />
                </div>
                <Field label="Team Size" value={value?.overview?.teamSize?.toString()} onChange={(v) => update('overview', 'teamSize', parseInt(v) || 1)} type="number" />
            </Section>
            <Section title="Problem">
                <Field label="Problem Statement" value={value?.problem?.statement} onChange={(v) => update('problem', 'statement', v)} multiline />
                <Field label="Business Context" value={value?.problem?.businessContext} onChange={(v) => update('problem', 'businessContext', v)} multiline />
                <ListField label="Goals" value={value?.problem?.goals} onChange={(v) => update('problem', 'goals', v)} placeholder="Add goal..." />
            </Section>
            <Section title="Methodology">
                <Field label="Approach" value={value?.methodology?.approach} onChange={(v) => update('methodology', 'approach', v)} multiline />
                <ProcessStepsField value={value?.methodology?.processSteps} onChange={(v) => update('methodology', 'processSteps', v)} />
            </Section>
            <Section title="Results">
                <MetricsField value={value?.results?.metrics} onChange={(v) => update('results', 'metrics', v)} />
                <Field label="Impact" value={value?.results?.impact} onChange={(v) => update('results', 'impact', v)} multiline />
                <ListField label="Learnings" value={value?.results?.learnings} onChange={(v) => update('results', 'learnings', v)} placeholder="Add learning..." />
            </Section>
        </div>
    )
}

// ========== DATA VISUALIZATION FORM ==========
function DataVizForm({ value, onChange }: { value: any; onChange: (v: any) => void }) {
    const { update } = useUpdate(value, onChange)

    // Color palette field
    const addColor = () => update('design', 'colorPalette', [...(value?.design?.colorPalette || []), { name: "", hex: "#000000", usage: "" }])
    const updateColor = (i: number, field: string, val: string) => {
        const colors = [...(value?.design?.colorPalette || [])]
        colors[i] = { ...colors[i], [field]: val }
        update('design', 'colorPalette', colors)
    }
    const removeColor = (i: number) => update('design', 'colorPalette', (value?.design?.colorPalette || []).filter((_: any, idx: number) => idx !== i))

    // Visualization field
    const addViz = () => update('implementation', 'visualization', [...(value?.implementation?.visualization || []), { type: "", purpose: "", insight: "" }])
    const updateViz = (i: number, field: string, val: string) => {
        const vizs = [...(value?.implementation?.visualization || [])]
        vizs[i] = { ...vizs[i], [field]: val }
        update('implementation', 'visualization', vizs)
    }
    const removeViz = (i: number) => update('implementation', 'visualization', (value?.implementation?.visualization || []).filter((_: any, idx: number) => idx !== i))

    return (
        <div className="space-y-4">
            <Section title="Overview" defaultOpen={true}>
                <Field label="Summary" value={value?.overview?.summary} onChange={(v) => update('overview', 'summary', v)} multiline />
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Role" value={value?.overview?.role} onChange={(v) => update('overview', 'role', v)} />
                    <Field label="Timeline" value={value?.overview?.timeline} onChange={(v) => update('overview', 'timeline', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Client" value={value?.overview?.client} onChange={(v) => update('overview', 'client', v)} placeholder="e.g., Metro General Hospital" />
                    <Field label="Audience" value={value?.overview?.audience} onChange={(v) => update('overview', 'audience', v)} placeholder="e.g., ED Directors, Nurses" />
                </div>
            </Section>
            <Section title="Problem">
                <Field label="Problem Statement" value={value?.problem?.statement} onChange={(v) => update('problem', 'statement', v)} multiline />
                <Field label="Business Context" value={value?.problem?.businessContext} onChange={(v) => update('problem', 'businessContext', v)} multiline />
                <ListField label="User Needs" value={value?.problem?.userNeeds} onChange={(v) => update('problem', 'userNeeds', v)} placeholder="Add user need..." />
                <Field label="Data Complexity" value={value?.problem?.dataComplexity} onChange={(v) => update('problem', 'dataComplexity', v)} multiline placeholder="Describe data sources and challenges..." />
            </Section>
            <Section title="Methodology">
                <Field label="Approach" value={value?.methodology?.approach} onChange={(v) => update('methodology', 'approach', v)} multiline />
                <ProcessStepsField value={value?.methodology?.processSteps} onChange={(v) => update('methodology', 'processSteps', v)} />
                <ListField label="Design Principles" value={value?.methodology?.designPrinciples} onChange={(v) => update('methodology', 'designPrinciples', v)} placeholder="Add principle..." />
            </Section>
            <Section title="Design">
                <div>
                    <label className="block text-sm font-medium mb-2">Color Palette</label>
                    <div className="space-y-2">
                        {(value?.design?.colorPalette || []).map((c: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="color" value={c.hex || "#000000"} onChange={(e) => updateColor(i, 'hex', e.target.value)} className="w-10 h-10 rounded border" />
                                <input type="text" value={c.name || ""} onChange={(e) => updateColor(i, 'name', e.target.value)} placeholder="Color name" className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={c.usage || ""} onChange={(e) => updateColor(i, 'usage', e.target.value)} placeholder="Usage" className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <button type="button" onClick={() => removeColor(i)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addColor}><Plus className="h-4 w-4 mr-1" /> Add Color</Button>
                    </div>
                </div>
                <Field label="Visual Hierarchy" value={value?.design?.visualHierarchy} onChange={(v) => update('design', 'visualHierarchy', v)} multiline />
                <Field label="Interactivity" value={value?.design?.interactivity} onChange={(v) => update('design', 'interactivity', v)} multiline />
                <Field label="Accessibility" value={value?.design?.accessibility} onChange={(v) => update('design', 'accessibility', v)} multiline placeholder="WCAG compliance, colorblind-safe..." />
            </Section>
            <Section title="Implementation">
                <Field label="Data Processing" value={value?.implementation?.dataProcessing} onChange={(v) => update('implementation', 'dataProcessing', v)} multiline />
                <div>
                    <label className="block text-sm font-medium mb-2">Visualizations</label>
                    <div className="space-y-3">
                        {(value?.implementation?.visualization || []).map((v: any, i: number) => (
                            <div key={i} className="p-3 bg-muted/20 rounded-lg space-y-2">
                                <div className="flex justify-end"><button type="button" onClick={() => removeViz(i)} className="text-red-500"><Trash2 className="h-3 w-3" /></button></div>
                                <input type="text" value={v.type || ""} onChange={(e) => updateViz(i, 'type', e.target.value)} placeholder="Chart type (e.g., KPI Cards)" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={v.purpose || ""} onChange={(e) => updateViz(i, 'purpose', e.target.value)} placeholder="Purpose" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <textarea value={v.insight || ""} onChange={(e) => updateViz(i, 'insight', e.target.value)} placeholder="Key insight" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addViz}><Plus className="h-4 w-4 mr-1" /> Add Visualization</Button>
                    </div>
                </div>
                <ChallengesField value={value?.implementation?.challenges} onChange={(v) => update('implementation', 'challenges', v)} />
            </Section>
            <Section title="Results">
                <MetricsField value={value?.results?.metrics} onChange={(v) => update('results', 'metrics', v)} />
                <Field label="Impact" value={value?.results?.impact} onChange={(v) => update('results', 'impact', v)} multiline />
                <ListField label="User Feedback" value={value?.results?.userFeedback} onChange={(v) => update('results', 'userFeedback', v)} placeholder="Add feedback quote..." />
                <Field label="Business Outcome" value={value?.results?.businessOutcome} onChange={(v) => update('results', 'businessOutcome', v)} multiline />
            </Section>
        </div>
    )
}

// ========== AI AUTOMATION FORM ==========
function AiAutomationForm({ value, onChange }: { value: any; onChange: (v: any) => void }) {
    const { update } = useUpdate(value, onChange)

    // Workflow field
    const addWorkflow = () => update('implementation', 'workflow', [...(value?.implementation?.workflow || []), { step: "", trigger: "", action: "", output: "" }])
    const updateWorkflow = (i: number, field: string, val: string) => {
        const wfs = [...(value?.implementation?.workflow || [])]
        wfs[i] = { ...wfs[i], [field]: val }
        update('implementation', 'workflow', wfs)
    }
    const removeWorkflow = (i: number) => update('implementation', 'workflow', (value?.implementation?.workflow || []).filter((_: any, idx: number) => idx !== i))

    return (
        <div className="space-y-4">
            <Section title="Overview" defaultOpen={true}>
                <Field label="Summary" value={value?.overview?.summary} onChange={(v) => update('overview', 'summary', v)} multiline />
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Role" value={value?.overview?.role} onChange={(v) => update('overview', 'role', v)} />
                    <Field label="Timeline" value={value?.overview?.timeline} onChange={(v) => update('overview', 'timeline', v)} />
                </div>
                <Field label="Team Size" value={value?.overview?.teamSize?.toString()} onChange={(v) => update('overview', 'teamSize', parseInt(v) || 1)} type="number" />
                <Field label="Context" value={value?.overview?.context} onChange={(v) => update('overview', 'context', v)} multiline placeholder="Business context and challenge..." />
            </Section>
            <Section title="Problem">
                <Field label="Problem Statement" value={value?.problem?.statement} onChange={(v) => update('problem', 'statement', v)} multiline />
                <ListField label="Goals" value={value?.problem?.goals} onChange={(v) => update('problem', 'goals', v)} />
                <div className="p-4 bg-muted/20 rounded-lg space-y-3">
                    <label className="block text-sm font-medium">Manual Process (Before)</label>
                    <Field label="Description" value={value?.problem?.manualProcess?.description} onChange={(v) => update('problem', 'manualProcess', { ...(value?.problem?.manualProcess || {}), description: v })} multiline />
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Time Per Task" value={value?.problem?.manualProcess?.timePerTask} onChange={(v) => update('problem', 'manualProcess', { ...(value?.problem?.manualProcess || {}), timePerTask: v })} placeholder="e.g., 15 minutes" />
                        <Field label="Frequency" value={value?.problem?.manualProcess?.frequency} onChange={(v) => update('problem', 'manualProcess', { ...(value?.problem?.manualProcess || {}), frequency: v })} placeholder="e.g., 200/day" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Error Rate" value={value?.problem?.manualProcess?.errorRate} onChange={(v) => update('problem', 'manualProcess', { ...(value?.problem?.manualProcess || {}), errorRate: v })} placeholder="e.g., 8%" />
                        <Field label="Annual Cost" value={value?.problem?.manualProcess?.annualCost} onChange={(v) => update('problem', 'manualProcess', { ...(value?.problem?.manualProcess || {}), annualCost: v })} placeholder="e.g., $120,000" />
                    </div>
                </div>
            </Section>
            <Section title="Methodology">
                <Field label="Approach" value={value?.methodology?.approach} onChange={(v) => update('methodology', 'approach', v)} multiline />
                <ProcessStepsField value={value?.methodology?.processSteps} onChange={(v) => update('methodology', 'processSteps', v)} showAutomation={true} />
                <ListField label="Tools Used" value={value?.methodology?.tools} onChange={(v) => update('methodology', 'tools', v)} placeholder="Add tool..." />
            </Section>
            <Section title="Implementation">
                <div>
                    <label className="block text-sm font-medium mb-2">Workflow Steps</label>
                    <div className="space-y-3">
                        {(value?.implementation?.workflow || []).map((w: any, i: number) => (
                            <div key={i} className="p-3 bg-muted/20 rounded-lg space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-muted-foreground">Workflow Step {i + 1}</span>
                                    <button type="button" onClick={() => removeWorkflow(i)} className="text-red-500"><Trash2 className="h-3 w-3" /></button>
                                </div>
                                <input type="text" value={w.step || ""} onChange={(e) => updateWorkflow(i, 'step', e.target.value)} placeholder="Step name" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={w.trigger || ""} onChange={(e) => updateWorkflow(i, 'trigger', e.target.value)} placeholder="Trigger (optional)" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={w.action || ""} onChange={(e) => updateWorkflow(i, 'action', e.target.value)} placeholder="Action" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={w.output || ""} onChange={(e) => updateWorkflow(i, 'output', e.target.value)} placeholder="Output" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addWorkflow}><Plus className="h-4 w-4 mr-1" /> Add Workflow Step</Button>
                    </div>
                </div>
                <ChallengesField value={value?.implementation?.challenges} onChange={(v) => update('implementation', 'challenges', v)} />
                <Field label="Integration" value={value?.implementation?.integration} onChange={(v) => update('implementation', 'integration', v)} multiline />
                <Field label="Testing" value={value?.implementation?.testing} onChange={(v) => update('implementation', 'testing', v)} multiline />
                <ListField label="Next Steps" value={value?.implementation?.nextSteps} onChange={(v) => update('implementation', 'nextSteps', v)} />
            </Section>
            <Section title="Results">
                <MetricsField value={value?.results?.metrics} onChange={(v) => update('results', 'metrics', v)} showImprovement={true} />
                <Field label="Impact" value={value?.results?.impact} onChange={(v) => update('results', 'impact', v)} multiline />
                <div className="p-4 bg-muted/20 rounded-lg space-y-3">
                    <label className="block text-sm font-medium">ROI</label>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Time Saved" value={value?.results?.roi?.timeSaved} onChange={(v) => update('results', 'roi', { ...(value?.results?.roi || {}), timeSaved: v })} placeholder="e.g., 1,200 hours/year" />
                        <Field label="Cost Savings" value={value?.results?.roi?.costSavings} onChange={(v) => update('results', 'roi', { ...(value?.results?.roi || {}), costSavings: v })} placeholder="e.g., $60,000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Payback Period" value={value?.results?.roi?.paybackPeriod} onChange={(v) => update('results', 'roi', { ...(value?.results?.roi || {}), paybackPeriod: v })} placeholder="e.g., 6 weeks" />
                        <Field label="Annual Value" value={value?.results?.roi?.annualValue} onChange={(v) => update('results', 'roi', { ...(value?.results?.roi || {}), annualValue: v })} />
                    </div>
                </div>
            </Section>
            <Section title="Maintenance">
                <ListField label="Monitoring" value={value?.maintenance?.monitoring} onChange={(v) => update('maintenance', 'monitoring', v)} placeholder="Add monitoring item..." />
                <Field label="Updates" value={value?.maintenance?.updates} onChange={(v) => update('maintenance', 'updates', v)} multiline />
                <Field label="Scalability" value={value?.maintenance?.scalability} onChange={(v) => update('maintenance', 'scalability', v)} multiline />
            </Section>
            <Section title="Contact">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Email" value={value?.contact?.email} onChange={(v) => update('contact', 'email', v)} type="email" />
                    <Field label="Phone" value={value?.contact?.phone} onChange={(v) => update('contact', 'phone', v)} type="tel" />
                </div>
            </Section>
        </div>
    )
}

// ========== AI ENGINEERING FORM ==========
function AiEngineeringForm({ value, onChange }: { value: any; onChange: (v: any) => void }) {
    const { update } = useUpdate(value, onChange)

    // Architecture components
    const addComponent = () => update('methodology', 'architecture', { ...(value?.methodology?.architecture || {}), components: [...(value?.methodology?.architecture?.components || []), { name: "", description: "", tech: [] }] })
    const updateComponent = (i: number, field: string, val: any) => {
        const comps = [...(value?.methodology?.architecture?.components || [])]
        comps[i] = { ...comps[i], [field]: val }
        update('methodology', 'architecture', { ...(value?.methodology?.architecture || {}), components: comps })
    }
    const removeComponent = (i: number) => update('methodology', 'architecture', { ...(value?.methodology?.architecture || {}), components: (value?.methodology?.architecture?.components || []).filter((_: any, idx: number) => idx !== i) })

    return (
        <div className="space-y-4">
            <Section title="Overview" defaultOpen={true}>
                <Field label="Summary" value={value?.overview?.summary} onChange={(v) => update('overview', 'summary', v)} multiline />
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Role" value={value?.overview?.role} onChange={(v) => update('overview', 'role', v)} />
                    <Field label="Timeline" value={value?.overview?.timeline} onChange={(v) => update('overview', 'timeline', v)} />
                </div>
                <Field label="Team Size" value={value?.overview?.teamSize?.toString()} onChange={(v) => update('overview', 'teamSize', parseInt(v) || 1)} type="number" />
                <Field label="Business Context" value={value?.overview?.businessContext} onChange={(v) => update('overview', 'businessContext', v)} multiline />
            </Section>
            <Section title="Problem">
                <Field label="Problem Statement" value={value?.problem?.statement} onChange={(v) => update('problem', 'statement', v)} multiline />
                <ListField label="Goals" value={value?.problem?.goals} onChange={(v) => update('problem', 'goals', v)} />
                <ListField label="Constraints" value={value?.problem?.constraints} onChange={(v) => update('problem', 'constraints', v)} placeholder="Add constraint..." />
                <ListField label="Stakeholders" value={value?.problem?.stakeholders} onChange={(v) => update('problem', 'stakeholders', v)} placeholder="Add stakeholder..." />
            </Section>
            <Section title="Methodology">
                <Field label="Approach" value={value?.methodology?.approach} onChange={(v) => update('methodology', 'approach', v)} multiline />
                <ProcessStepsField value={value?.methodology?.processSteps} onChange={(v) => update('methodology', 'processSteps', v)} />
                <div>
                    <label className="block text-sm font-medium mb-2">Architecture Components</label>
                    <div className="space-y-3">
                        {(value?.methodology?.architecture?.components || []).map((c: any, i: number) => (
                            <div key={i} className="p-3 bg-muted/20 rounded-lg space-y-2">
                                <div className="flex justify-end"><button type="button" onClick={() => removeComponent(i)} className="text-red-500"><Trash2 className="h-3 w-3" /></button></div>
                                <input type="text" value={c.name || ""} onChange={(e) => updateComponent(i, 'name', e.target.value)} placeholder="Component name" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <textarea value={c.description || ""} onChange={(e) => updateComponent(i, 'description', e.target.value)} placeholder="Description" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                                <input type="text" value={(c.tech || []).join(", ")} onChange={(e) => updateComponent(i, 'tech', e.target.value.split(",").map((t: string) => t.trim()))} placeholder="Technologies (comma-separated)" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" />
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addComponent}><Plus className="h-4 w-4 mr-1" /> Add Component</Button>
                    </div>
                </div>
            </Section>
            <Section title="Implementation">
                <Field label="Data Strategy" value={value?.implementation?.dataStrategy} onChange={(v) => update('implementation', 'dataStrategy', v)} multiline />
                <Field label="Model Details" value={value?.implementation?.modelDetails} onChange={(v) => update('implementation', 'modelDetails', v)} multiline />
                <ListField label="Pipeline Steps" value={value?.implementation?.pipeline} onChange={(v) => update('implementation', 'pipeline', v)} placeholder="Add pipeline step..." />
                <ChallengesField value={value?.implementation?.challenges} onChange={(v) => update('implementation', 'challenges', v)} />
            </Section>
            <Section title="Results">
                <MetricsField value={value?.results?.metrics} onChange={(v) => update('results', 'metrics', v)} showImprovement={true} />
                <Field label="Impact" value={value?.results?.impact} onChange={(v) => update('results', 'impact', v)} multiline />
                <Field label="Business Value" value={value?.results?.businessValue} onChange={(v) => update('results', 'businessValue', v)} multiline />
            </Section>
            <Section title="Deployment">
                <Field label="Infrastructure" value={value?.deployment?.infrastructure} onChange={(v) => update('deployment', 'infrastructure', v)} multiline />
                <ListField label="Monitoring" value={value?.deployment?.monitoring} onChange={(v) => update('deployment', 'monitoring', v)} placeholder="Add monitoring item..." />
                <Field label="Scalability" value={value?.deployment?.scalability} onChange={(v) => update('deployment', 'scalability', v)} multiline />
            </Section>
            <Section title="Learnings">
                <ListField label="Technical Insights" value={value?.learnings?.technical} onChange={(v) => update('learnings', 'technical', v)} placeholder="Add technical learning..." />
                <ListField label="Business Insights" value={value?.learnings?.business} onChange={(v) => update('learnings', 'business', v)} placeholder="Add business learning..." />
            </Section>
        </div>
    )
}

// ========== MAIN COMPONENT ==========
export default function CaseStudyForm({ category, value, onChange }: CaseStudyFormProps) {
    switch (category) {
        case 'data-science':
            return <DataScienceForm value={value} onChange={onChange} />
        case 'data-visualization':
            return <DataVizForm value={value} onChange={onChange} />
        case 'ai-automation':
            return <AiAutomationForm value={value} onChange={onChange} />
        case 'ai-engineering':
            return <AiEngineeringForm value={value} onChange={onChange} />
        default:
            return <DataScienceForm value={value} onChange={onChange} />
    }
}
