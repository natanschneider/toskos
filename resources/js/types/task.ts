export interface Task {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
  planned_start_date: string | null;
  planned_end_date: string | null;
  responsible: string | null;
  supervisor: string | null;
  doc_file: string | null;
  status_id: number;
  created_by: string;
  team_id: number;
  parent_id: number | null;
  created_at?: string;
  updated_at?: string;
}
