import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from "@/app/actions/projects";

export default async function DashboardPage() {
    const res = await fetch('http://localhost:3000/api/projects', {
        cache: 'no-store',
    });

    const projects = await res.json();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <AddProjectForm />

            <ul>
                {projects.map((p: any) => (
                    <li key={p.id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>

                        {/* Color preview */}
                        <span style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: p.color,
                            display: 'inline-block'
                        }} />

                        {/* Rename + change color */}
                        <form action={renameProject} style={{ display: 'flex', gap: 6 }}>
                            <input type="hidden" name="id" value={p.id} />

                            <input
                                name="name"
                                defaultValue={p.name}
                                style={{ padding: 4 }}
                            />

                            <input
                                type="color"
                                name="color"
                                defaultValue={p.color}
                                style={{ width: 40, height: 30, border: 'none' }}
                            />

                            <button type="submit">💾</button>
                        </form>

                        {/* Delete */}
                        <form action={deleteProject}>
                            <input type="hidden" name="id" value={p.id} />
                            <button type="submit">🗑️</button>
                        </form>

                    </li>
                ))}
            </ul>
        </div>
    );
}