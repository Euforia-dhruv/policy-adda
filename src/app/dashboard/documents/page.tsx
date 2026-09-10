"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";
import type { Document } from "@/types/database";

const typeColors: Record<string, string> = {
  Identity: "bg-blue-500/10 text-blue-400",
  Policy: "bg-cobalt/10 text-cobalt",
  Medical: "bg-emerald-500/10 text-emerald-400",
  Vehicle: "bg-amber-500/10 text-amber-400",
};

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("owner_id", user.id)
        .order("uploaded_at", { ascending: false });

      setDocuments((data as Document[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-ivory">Documents</h1>
          <p className="mt-1 text-sm text-ash">Manage your uploaded documents</p>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="card-material rounded-xl p-12 text-center">
          <Icon name="folder" size={48} className="mx-auto text-ash/40" />
          <h3 className="mt-4 text-lg font-medium text-ivory">No documents uploaded</h3>
          <p className="mt-2 text-sm text-ash">Upload documents when applying for a policy</p>
        </div>
      ) : (
        <div className="card-material overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-ash">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon name="file-text" size={18} className="text-ash" />
                        <span className="text-sm font-medium text-ivory">{doc.file_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[doc.document_type] || "bg-ash/10 text-ash"}`}>
                        {doc.document_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ash">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-ash">{formatFileSize(doc.file_size)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
