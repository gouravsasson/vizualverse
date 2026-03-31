"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Upload, Trash2, LogIn, LogOut, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface CloudImage {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: string;
  folder: string;
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [images, setImages] = useState<CloudImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState<"All" | "Exterior" | "Interior">("All");
  const [uploadFolder, setUploadFolder] = useState<"Exterior" | "Interior">("Exterior");

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cloudinary", {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(data.images);
    } catch {
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, [password]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/cloudinary", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setAuthenticated(true);
        const data = await res.json();
        setImages(data.images);
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    setSuccess("");

    let uploaded = 0;
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);

      try {
        const res = await fetch("/api/cloudinary", {
          method: "POST",
          headers: { "x-admin-password": password },
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }
        uploaded++;
      } catch (err) {
        setError(`Failed to upload ${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }

    if (uploaded > 0) {
      setSuccess(`${uploaded} image${uploaded > 1 ? "s" : ""} uploaded successfully`);
      fetchImages();
    }

    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeleting(publicId);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/cloudinary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ public_id: publicId }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setSuccess("Image deleted successfully");
      setImages((prev) => prev.filter((img) => img.public_id !== publicId));
    } catch {
      setError("Failed to delete image");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const filteredImages = images.filter((img) => {
    if (filter === "All") return img.folder === "Exterior" || img.folder === "Interior";
    return img.folder === filter;
  });

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Enter password to continue</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                {error}
              </div>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Password"
              className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 mb-4"
            />
            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full bg-white text-black font-medium py-3 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Sign In
            </button>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              &larr; Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <span className="text-sm text-gray-500">
            {images.length} images
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            View Site
          </Link>
          <button
            onClick={() => {
              setAuthenticated(false);
              setPassword("");
              setImages([]);
            }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Notifications */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center justify-between">
            {error}
            <X className="w-4 h-4 cursor-pointer" onClick={() => setError("")} />
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 flex items-center justify-between">
            {success}
            <X className="w-4 h-4 cursor-pointer" onClick={() => setSuccess("")} />
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-8 bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value as "Exterior" | "Interior")}
              className="bg-black border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-500"
            >
              <option value="Exterior">Exterior</option>
              <option value="Interior">Interior</option>
            </select>

            <label className="flex items-center gap-2 bg-white text-black font-medium px-6 py-2 rounded cursor-pointer hover:bg-gray-200 transition-colors">
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {uploading ? "Uploading..." : "Choose Files"}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <span className="text-sm text-gray-500">
              Supports JPG, PNG, WebP (max 10MB each)
            </span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          {(["All", "Exterior", "Interior"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {f}
              <span className="ml-2 text-xs opacity-60">
                ({f === "All"
                  ? images.filter((i) => i.folder === "Exterior" || i.folder === "Interior").length
                  : images.filter((i) => i.folder === f).length})
              </span>
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-4" />
            <p>No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.public_id}
                className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <div className="aspect-[4/3] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.secure_url}
                    alt={img.public_id}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  <button
                    onClick={() => handleDelete(img.public_id)}
                    disabled={deleting === img.public_id}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting === img.public_id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 truncate">{img.public_id.split("/").pop()}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">{img.width}x{img.height}</span>
                    <span className="text-xs text-gray-600">{formatBytes(img.bytes)}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${img.folder === "Exterior" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`}>
                      {img.folder}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
