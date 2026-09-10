"use client";
import {
  Car, Bike, Heart, Shield, Phone, MessageCircle, Check, MapPin, Sparkles,
  ArrowRight, Menu, X, Search, Bell, User, Settings, FileText, Users,
  BarChart3, Clock, ChevronDown, ChevronRight, ExternalLink, Mail, Globe,
  Star, AlertCircle, Info, Filter, Download, Upload, Trash2, Edit, Plus, Minus,
  Eye, EyeOff, Lock, Unlock, LogOut, Calendar, CreditCard, Briefcase, Home,
  Building, GraduationCap, Baby, Plane, Truck, Package, RefreshCw, MoreHorizontal,
  Inbox, MessageSquare, Send, Folder, Image, Video, Mic, Link, Copy, Clipboard,
  CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, DollarSign,
  Tag, Bookmark, Share2, Zap, Sun, Moon, Wifi, Activity, Database, Server,
  Cloud, Brain, Stethoscope, Pill, Ambulance, Hospital, LayoutDashboard,
  FileCheck, UserCheck, ClipboardList, PieChart, Settings2, ShieldCheck, Quote,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  car: Car, bike: Bike, health: Heart, shield: Shield, phone: Phone,
  chat: MessageCircle, check: Check, pin: MapPin, spark: Sparkles,
  arrow: ArrowRight, menu: Menu, x: X, search: Search, bell: Bell,
  user: User, settings: Settings, "file-text": FileText, users: Users,
  "bar-chart": BarChart3, clock: Clock, "chevron-down": ChevronDown,
  "chevron-right": ChevronRight, "external-link": ExternalLink, mail: Mail,
  globe: Globe, star: Star, "alert-circle": AlertCircle, info: Info,
  filter: Filter, download: Download, upload: Upload, trash: Trash2,
  edit: Edit, plus: Plus, minus: Minus, eye: Eye, "eye-off": EyeOff,
  lock: Lock, unlock: Unlock, "log-out": LogOut, calendar: Calendar,
  "credit-card": CreditCard, briefcase: Briefcase, home: Home,
  building: Building, "graduation-cap": GraduationCap, baby: Baby,
  plane: Plane, truck: Truck, package: Package, "refresh-cw": RefreshCw,
  "more-horizontal": MoreHorizontal, inbox: Inbox, "message-square": MessageSquare,
  send: Send, folder: Folder, image: Image, video: Video, mic: Mic,
  link: Link, copy: Copy, clipboard: Clipboard, "check-circle": CheckCircle,
  "x-circle": XCircle, "alert-triangle": AlertTriangle, "trending-up": TrendingUp,
  "trending-down": TrendingDown, "dollar-sign": DollarSign, tag: Tag,
  bookmark: Bookmark, "share-2": Share2, zap: Zap, sun: Sun, moon: Moon,
  wifi: Wifi, activity: Activity, database: Database, server: Server,
  cloud: Cloud, brain: Brain, stethoscope: Stethoscope, pill: Pill,
  ambulance: Ambulance, hospital: Hospital, dashboard: LayoutDashboard,
  "file-check": FileCheck, "user-check": UserCheck, "clipboard-list": ClipboardList,
  "pie-chart": PieChart, "settings-2": Settings2, "shield-check": ShieldCheck,
  quote: Quote,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name] || Check;
  return <IconComponent size={size} className={className} />;
}

export type { LucideIcon };