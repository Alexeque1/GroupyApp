"use client";

import Image from "next/image";
import { MoreVertical, Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPostCategoryInfo } from "@/lib/post-category";
import { getCommentsForPost } from "@/lib/posts-selector";
import { PostViewModel } from "@/lib/posts-selector";
import { FeedUser } from "@/lib/mock_data/users-data";

interface FeedPostCardProps {
    post: PostViewModel;
    user: FeedUser;
}

export default function FeedPostCard({ post, user }: FeedPostCardProps) {
    const categoryInfo = getPostCategoryInfo(post.category);
    const CategoryIcon = categoryInfo.icon;
    
    // Obtenemos los comentarios para este post
    const postComments = getCommentsForPost(post.id);

    return (
        <div
            className={cn(
                "flex flex-col gap-4 rounded-3xl border p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all",
                categoryInfo.cardClasses // Aplica el fondo entintado clarito y el borde dinámicamente
            )}
        >
            {/* 1. HEADER DEL POST */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/10 shadow-sm dark:border-white/10">
                        <Image
                            src={post.author.profileImage}
                            alt={`${post.author.firstName} ${post.author.lastName}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Info Usuario */}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-black dark:text-white">
                            {`${post.author.firstName} ${post.author.lastName}`}
                        </span>
                        <span className="text-xs font-medium text-black/50 dark:text-white/50">
                            {post.createdAt}
                        </span>
                    </div>
                </div>

                {/* Badge de Categoría + Botón Opciones */}
                <div className="flex items-center gap-2">
                    {/* ETIQUETA MODERNA: Estilo pastilla, sin mayúsculas, sutil */}
                    <span
                        className={cn(
                            "hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md sm:flex",
                            categoryInfo.badgeClasses
                        )}
                    >
                        <CategoryIcon size={14} strokeWidth={2.5} />
                        {categoryInfo.label}
                    </span>
                    <button className="cursor-pointer rounded-full p-1.5 text-black/40 transition-colors hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* 2. CONTENIDO (Texto + Hashtags) */}
            <div className="text-sm leading-relaxed text-black/80 dark:text-white/80">
                {post.content}
            </div>

            {/* 3. IMAGEN DEL POST (Renderizado condicional) */}
            {post.category === "Media" && post.imageUrl && (
                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-black/5 shadow-sm dark:border-white/5 md:h-80 lg:h-[400px]">
                    <Image
                        src={post.imageUrl}
                        alt="Post content"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* 4. BARRA DE ACCIONES */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-6">
                    {/* Like */}
                    <button className="group flex cursor-pointer items-center gap-1.5 text-black/60 transition-colors hover:text-rose-500 dark:text-white/60">
                        <Heart size={20} className="transition-transform group-hover:scale-110 group-hover:fill-rose-500 group-hover:text-rose-500" />
                        <span className="text-sm font-semibold">{post.likeCount}</span>
                    </button>

                    {/* Comment */}
                    <button className="group flex cursor-pointer items-center gap-1.5 text-black/60 transition-colors hover:text-[#8C6CFF] dark:text-white/60">
                        <MessageCircle size={20} className="transition-transform group-hover:scale-110" />
                        <span className="text-sm font-semibold">{post.commentCount}</span>
                    </button>
                </div>

                {/* Share/Send */}
                <button className="cursor-pointer rounded-full p-2 text-black/60 transition-all hover:scale-110 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white">
                    <Send size={18} className="origin-bottom-left -rotate-12" />
                </button>
            </div>

            {/* 5. SECCIÓN DE COMENTARIOS */}
            <div className="mt-2 flex flex-col gap-4 border-t border-black/10 pt-4 dark:border-white/10">
                
                {/* LISTA DE COMENTARIOS O ESTADO VACÍO */}
                {postComments && postComments.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {postComments.map((comment: any) => (
                            <div key={comment.id} className="flex items-start gap-2.5">
                                {/* Avatar del comentario */}
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10">
                                    <Image
                                        src={comment.author.profileImage}
                                        alt={`${comment.author.firstName} ${comment.author.lastName}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                
                                {/* Contenido del comentario */}
                                <div className="flex flex-1 flex-col">
                                    <div className="w-fit rounded-2xl rounded-tl-none border border-black/5 bg-black/5 px-3.5 py-2.5 dark:border-white/5 dark:bg-white/5">
                                        <span className="mr-2 text-xs font-bold text-black dark:text-white">
                                            {comment.author.firstName} {comment.author.lastName}
                                        </span>
                                        <span className="text-xs text-black/80 dark:text-white/80">
                                            {comment.content}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-3 px-2">
                                        <span className="text-[10px] font-medium text-black/40 dark:text-white/40">{comment.createdAt}</span>
                                        <button className="cursor-pointer text-[10px] font-bold text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white">
                                            Reply
                                        </button>
                                    </div>
                                </div>

                                {/* Botón Like del comentario */}
                                <button className="group mt-2 cursor-pointer text-black/30 transition-colors hover:text-rose-500 dark:text-white/30">
                                    <Heart size={14} className="transition-transform group-hover:scale-110 group-hover:fill-rose-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // ESTADO VACÍO
                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-black/10 bg-black/[0.02] py-6 dark:border-white/10 dark:bg-white/[0.02]">
                        <p className="text-sm text-black/50 dark:text-white/50">
                            No comments yet. <span className="font-semibold text-[#8C6CFF]">Be the first to share your thoughts!</span>
                        </p>
                    </div>
                )}

                {/* CAJA DE TEXTO PARA ESCRIBIR UN NUEVO COMENTARIO */}
                <div className="mt-1 flex items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10">
                        <Image
                            src={user.profileImage} 
                            alt={`${user.firstName} ${user.lastName}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-[#8C6CFF]/50 dark:border-white/10 dark:bg-[#0a0514] dark:focus-within:border-[#8C6CFF]/50">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}