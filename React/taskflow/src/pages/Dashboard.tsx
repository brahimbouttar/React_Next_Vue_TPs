import { useState, useEffect, useCallback } from "react";
import HeaderBS from "../components/HeaderBS";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import ProjectForm from "../components/ProjectForm";
import styles from "./Dashboard.module.css";
import Tooltip from "../components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.ts";
import type { RootState } from "../store.ts";
import { memo } from "react";
import useProjects from '../hooks/useProjects'; 

interface Project {
  id: string;
  name: string;
  color: string;
}
interface Column {
  id: string;
  title: string;
  tasks: string[];
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const MemoizedSidebar = memo(Sidebar);
  const { projects, columns, loading, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleRename = useCallback((project: Project) => {
    renameProject(project.id, project.name, project.color);
  }, [renameProject]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  const dangerousName = '<img src=x onerror=alert("HACK")>';
  return (
    <div className={styles.layout}>
      <HeaderBS
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen((p) => !p)}
        userName={user?.name}
        onLogout={() => dispatch(logout())} //{ type: "LOGOUT" }
      />
      <div className={styles.body}>
        <MemoizedSidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={handleRename}
        />
        <div className={styles.content}>
          <div className={styles.toolbar}>
            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={(name, color) => {
                  addProject(name, color);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
            <p>{dangerousName}</p>
            <div dangerouslySetInnerHTML={{ __html: dangerousName }} />
          </div>
          <Tooltip />
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}
