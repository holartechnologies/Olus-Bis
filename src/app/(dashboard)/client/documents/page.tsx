"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  category: string | null;
  verificationStatus: string;
  createdAt: string;
}

export default function ClientDocumentsPage() {
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size must be less than 20MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Document uploaded successfully!");
        const data = await res.json();
        setDocuments((prev) => [data.document, ...prev]);
      } else {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Documents</h1>
          <p className="text-sm text-gray-500">Upload and manage your immigration documents</p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button
            asChild
            disabled={uploading}
            className="bg-[#0B3AA8] hover:bg-[#082A78]"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {uploading ? "Uploading..." : "Upload Document"}
            </label>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No documents uploaded yet</p>
              <p className="text-sm text-gray-400">
                Upload your passports, certificates, visa documents, and other immigration-related files.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Size</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{doc.originalName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 capitalize">{doc.category || "General"}</td>
                    <td className="p-4 text-sm text-gray-600">{formatSize(doc.fileSize)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(doc.verificationStatus)}
                        <span className="text-sm">{doc.verificationStatus}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      {doc.verificationStatus === "VERIFIED" && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/api/download/${doc.id}`}>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-gray-400">
        Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG. Maximum file size: 20MB.
      </div>
    </div>
  );
}
