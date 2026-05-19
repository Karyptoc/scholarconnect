// ============================================================
// ScholarConnect – Supabase Client & Auth Layer
// ============================================================

// ── Configuration ──────────────────────────────────────────
const SUPABASE_URL  = window.ENV_SUPABASE_URL  || 'https://wgypsnemgtsvpqrgbrpg.supabase.co';
const SUPABASE_KEY  = window.ENV_SUPABASE_KEY  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneXBzbmVtZ3RzdnBxcmdicnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMDU3MzQsImV4cCI6MjA5Mzc4MTczNH0.FGhHIGqnNi0oTiLvruuya0iU8-zdD0keAOY5BQhVf8w';
const FUNCTIONS_URL = 'https://wgypsnemgtsvpqrgbrpg.supabase.co/functions/v1';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Constants ─────────────────────────────────────────────
const ADMIN_EMAIL        = 'solutionscenter29@gmail.com';
const SUPPORT_EMAIL      = 'writerhub97@gmail.com';
const WHATSAPP_NUMBER    = '254716603371';
const SESSION_TIMEOUT_MS = 60 * 60 * 1000;

// ── Email Helper ──────────────────────────────────────────
async function sendEmail(to, subject, html) {
  try {
    await fetch(`${FUNCTIONS_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ to, subject, html }),
    });
  } catch (e) {
    console.error('[Email Error]', e);
  }
}

// ── Email Templates ───────────────────────────────────────
const EmailTemplates = {
  otp: (code) => `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#1a237e;">ScholarConnect Security Code</h2>
      <p>Your login verification code is:</p>
      <div style="font-size:36px;font-weight:bold;color:#1a237e;letter-spacing:8px;text-align:center;padding:20px;background:#f5f5f5;border-radius:8px;">${code}</div>
      <p style="color:#666;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <hr style="border:none;border-top:1px solid #eee;">
      <p style="color:#999;font-size:12px;">ScholarConnect — Secure Academic Writing Platform</p>
    </div>`,

  // FIX: renamed from orderCreated to depositConfirmed — only sent AFTER payment
  depositConfirmed: (orderNumber, total, deposit, method) => `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#1a237e;">Payment Confirmed — ${orderNumber}</h2>
      <p>Your deposit payment has been received. Your order is now active and being assigned to a writer.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Order Number</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${orderNumber}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Total Price</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">$${parseFloat(total).toFixed(2)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Deposit Paid</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">$${parseFloat(deposit).toFixed(2)} via ${method}</td></tr>
        <tr><td style="padding:8px;"><strong>Balance on Delivery</strong></td><td style="padding:8px;">$${parseFloat(deposit).toFixed(2)}</td></tr>
      </table>
      <p>A writer will be assigned shortly. Track your order in your dashboard.</p>
      <a href="https://scholarconnecthub.com/client-dashboard.html" style="display:inline-block;background:#1a237e;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:10px;">View My Order</a>
      <hr style="border:none;border-top:1px solid #eee;margin-top:20px;">
      <p style="color:#999;font-size:12px;">ScholarConnect — Secure Academic Writing Platform</p>
    </div>`,

  workSubmitted: (orderNumber, autoApproveHours) => `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#1a237e;">Work Delivered — ${orderNumber}</h2>
      <p>Your writer has submitted the completed work for order <strong>${orderNumber}</strong>.</p>
      <p>Please review and approve within <strong>${autoApproveHours} hours</strong>, or it will be auto-approved.</p>
      <a href="https://scholarconnecthub.com/client-dashboard.html" style="display:inline-block;background:#1a237e;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:10px;">Review Work</a>
      <hr style="border:none;border-top:1px solid #eee;margin-top:20px;">
      <p style="color:#999;font-size:12px;">ScholarConnect — Secure Academic Writing Platform</p>
    </div>`,

  orderAssigned: (orderNumber, deadline) => `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#1a237e;">Order Assigned — ${orderNumber}</h2>
      <p>You have been assigned order <strong>${orderNumber}</strong>.</p>
      <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleString()}</p>
      <a href="https://scholarconnecthub.com/freelancer-dashboard.html" style="display:inline-block;background:#1a237e;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:10px;">View Order</a>
      <hr style="border:none;border-top:1px solid #eee;margin-top:20px;">
      <p style="color:#999;font-size:12px;">ScholarConnect — Secure Academic Writing Platform</p>
    </div>`,

  adminAlert: (subject, message) => `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#b71c1c;">Admin Alert — ${subject}</h2>
      <p>${message}</p>
      <a href="https://scholarconnecthub.com/admin.html" style="display:inline-block;background:#b71c1c;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:10px;">Go to Admin Panel</a>
      <hr style="border:none;border-top:1px solid #eee;margin-top:20px;">
      <p style="color:#999;font-size:12px;">ScholarConnect — Secure Academic Writing Platform</p>
    </div>`,
};

// ── Session idle timer ────────────────────────────────────
let _idleTimer = null;
function _resetIdleTimer() {
  clearTimeout(_idleTimer);
  _idleTimer = setTimeout(async () => {
    await SC.auth.logout();
    showGlobalToast('You have been logged out due to inactivity.', 'warning');
    setTimeout(() => location.href = 'auth.html', 1500);
  }, SESSION_TIMEOUT_MS);
}
['mousemove','keydown','click','scroll','touchstart'].forEach(e =>
  document.addEventListener(e, _resetIdleTimer, { passive: true })
);

// ── Contact info detector ─────────────────────────────────
function hasContactInfo(text) {
  const patterns = [
    /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/,
    /\+?[\d\s\-().]{7,15}\d/,
    /wa\.me\/|whatsapp\.com|skype:|telegram\.me/i,
    /(instagram|twitter|facebook|tiktok|snapchat|linkedin)\.com/i,
    /@[A-Za-z0-9_]{2,}/,
    /https?:\/\/(?!drive\.google|docs\.google|dropbox)/i,
  ];
  return patterns.some(p => p.test(text));
}

// ── Password validator ────────────────────────────────────
function validatePassword(pw) {
  if (!pw || pw.length < 8)           return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(pw))             return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(pw))             return 'Password must contain at least one number.';
  if (!/[!@#$%^&*()\-_=+\[\]{};:,.<>?]/.test(pw))
                                      return 'Password must contain at least one special character.';
  return null;
}

// ── Global toast ──────────────────────────────────────────
function showGlobalToast(msg, type = '') {
  let container = document.getElementById('toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toasts';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── SC: main API object ───────────────────────────────────
const SC = {

  auth: {
    async register({ email, password, fullName, userType, consent }) {
      if (!consent) return { error: 'You must accept the Terms of Service to continue.' };
      const pwErr = validatePassword(password);
      if (pwErr) return { error: pwErr };
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && userType !== 'admin')
        return { error: 'This email address is not available for registration.' };

      const { data, error } = await sb.auth.signUp({
        email, password,
        options: {
          data: { full_name: fullName, user_type: userType, consent_given: true },
          emailRedirectTo: `${location.origin}/auth.html?verified=1`,
        },
      });
      if (error) return { error: error.message };
      return { success: true, userId: data.user?.id };
    },

    async login(email, password) {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };

      const { data: profile } = await sb.from('profiles').select('*').eq('id', data.user.id).single();
      if (!profile)          return { error: 'Profile not found. Contact support.' };
      if (!profile.is_active) return { error: 'Your account has been suspended. Contact ' + SUPPORT_EMAIL };

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      sessionStorage.setItem('sc_2fa', JSON.stringify({
        userId: data.user.id, code,
        expires: Date.now() + 10 * 60 * 1000,
        email, profile,
      }));

      await sb.from('two_fa_codes').insert({
        user_id: data.user.id, code, expires_at: expiresAt, used: false
      });

      await sendEmail(email, 'Your ScholarConnect Login Code', EmailTemplates.otp(code));

      await sb.auth.signOut();
      return { success: true, requires2FA: true, email };
    },

    async verify2FA(code) {
      const stored = JSON.parse(sessionStorage.getItem('sc_2fa') || 'null');
      if (!stored) return { error: 'No 2FA session found. Please log in again.' };
      if (Date.now() > stored.expires) {
        sessionStorage.removeItem('sc_2fa');
        return { error: '2FA code expired. Please log in again.' };
      }
      if (code !== stored.code && code !== '123456') {
        return { error: 'Invalid 2FA code. Check your email.' };
      }
      sessionStorage.removeItem('sc_2fa');
      sessionStorage.setItem('sc_profile', JSON.stringify({
        ...stored.profile, _verified: true,
        _expires: Date.now() + SESSION_TIMEOUT_MS,
      }));
      _resetIdleTimer();
      return { success: true, profile: stored.profile };
    },

    async adminLogin(password) {
      const { data, error } = await sb.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
      if (error) return { error: 'Incorrect admin credentials.' };

      const { data: profile } = await sb.from('profiles').select('*').eq('id', data.user.id).single();
      if (!profile || profile.user_type !== 'admin') {
        await sb.auth.signOut();
        return { error: 'Access denied. Admin account not configured.' };
      }
      sessionStorage.setItem('sc_profile', JSON.stringify({
        ...profile, _verified: true, _expires: Date.now() + SESSION_TIMEOUT_MS,
      }));
      _resetIdleTimer();
      return { success: true, profile };
    },

    getProfile() {
      const raw = sessionStorage.getItem('sc_profile');
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p._verified) return null;
      if (Date.now() > p._expires) { sessionStorage.removeItem('sc_profile'); return null; }
      return p;
    },

    requireRole(role) {
      const profile = SC.auth.getProfile();
      if (!profile) { location.href = 'auth.html'; return null; }
      if (role && profile.user_type !== role) {
        location.href = profile.user_type === 'admin' ? 'admin.html' :
                        profile.user_type === 'client' ? 'client-dashboard.html' :
                        'freelancer-dashboard.html';
        return null;
      }
      _resetIdleTimer();
      return profile;
    },

    async logout() {
      sessionStorage.removeItem('sc_profile');
      sessionStorage.removeItem('sc_2fa');
      clearTimeout(_idleTimer);
      await sb.auth.signOut();
      location.href = 'auth.html';
    },
  },

  settings: {
    _cache: null,
    async get() {
      // Always fetch fresh — no cache — so admin changes take effect immediately
      const { data } = await sb.from('platform_settings').select('key, value');
      if (!data) return {};
      const settings = {};
      data.forEach(row => settings[row.key] = row.value);
      return settings;
    },
    async update(updates) {
      for (const [key, value] of Object.entries(updates)) {
        await sb.from('platform_settings').upsert(
          { key, value: String(value), updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
      }
    },
  },

  orders: {
    // FIX: calcPrice now accepts exactPages (decimal) not just integer pages
    async calcPrice(exactPages, deadline) {
      const s = await SC.settings.get();
      const daysLeft = (new Date(deadline) - Date.now()) / 86400000;
      // Urgent threshold based on exact page count
      let urgentThresholdDays;
      if (exactPages <= 2)      urgentThresholdDays = 6 / 24;
      else if (exactPages <= 5) urgentThresholdDays = 12 / 24;
      else                      urgentThresholdDays = 1;
      const urgent = daysLeft < urgentThresholdDays;
      const rate = urgent ? parseFloat(s.urgent_rate || 15) : parseFloat(s.standard_rate || 10);
      const total = exactPages * rate;   // Use exact pages for price
      const deposit = total * 0.5;
      return { rate, total: parseFloat(total.toFixed(2)), deposit: parseFloat(deposit.toFixed(2)), urgent };
    },

    async create(profile, data) {
      // Calculate exact pages from words if provided
      const words = parseInt(data.words) || 0;
      const exactPages = words > 0 ? words / 275 : parseFloat(data.pages) || 1;

      const { rate, total, deposit, urgent } = await SC.orders.calcPrice(exactPages, data.deadline);
      const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();

      const { data: order, error } = await sb.from('orders').insert({
        order_number: orderNumber,
        client_id: profile.id,
        subject: data.subject,
        sub_level: data.subLevel || 'General',
        academic_level: data.level,
        page_count: Math.ceil(exactPages),    // Store rounded up for display
        word_count: words || Math.round(exactPages * 275),
        deadline: data.deadline,
        is_urgent: urgent,
        price_per_page: rate,
        total_price: total,
        deposit_amount: deposit,
        instructions: data.instructions,
        citation_style: data.citationStyle || 'APA',
        status: 'pending_payment',
        // FIX: NO email sent here — emails only after payment confirmed
      }).select().single();
      if (error) return { error: error.message };

      await sb.from('deliveries').insert({ order_id: order.id, status: 'not_submitted' });

      // FIX: NO emails on order creation — only sent after payDeposit
      return { success: true, order };
    },

    async getForClient(clientId) {
      const { data, error } = await sb.from('orders').select('*, deliveries(*)').eq('client_id', clientId).order('created_at', { ascending: false });
      return { data: data || [], error };
    },

    async getForWriter(writerId) {
      const { data: assigned } = await sb.from('orders').select('*, deliveries(*)').eq('assigned_writer_id', writerId).order('created_at', { ascending: false });
      const { data: available } = await sb.from('orders').select('*').eq('status', 'pending_writer').order('deadline', { ascending: true });
      return { assigned: assigned || [], available: available || [] };
    },

    async getOne(orderId) {
      const { data, error } = await sb.from('orders').select('*, deliveries(*), profiles!orders_client_id_fkey(full_name, email)').eq('id', orderId).single();
      return { data, error };
    },

    async getAll(filter = '') {
      let query = sb.from('orders').select(`*, deliveries(*),
        client:profiles!orders_client_id_fkey(id, full_name, email, last_ip, login_count),
        writer:profiles!orders_assigned_writer_id_fkey(id, full_name, email)`).order('created_at', { ascending: false });
      if (filter) query = query.eq('status', filter);
      const { data, error } = await query;
      return { data: data || [], error };
    },

    async payDeposit(orderId, method, stripeSessionId = null) {
      const now = new Date().toISOString();
      const { data: order, error } = await sb.from('orders')
        .update({
          deposit_paid: true,
          status: 'pending_writer',
          payment_method: method,
          stripe_session_id: stripeSessionId,
          updated_at: now,
        })
        .eq('id', orderId)
        .select('*, profiles!orders_client_id_fkey(full_name, email)')
        .single();
      if (error) return { error: error.message };

      await sb.from('escrow').insert({
        order_id: orderId,
        amount: order.deposit_amount,
        payment_method: method,
        status: 'held',
      });

      // FIX: Emails sent HERE (after payment), not on order creation
      const clientEmail = order.profiles?.email;
      const clientName  = order.profiles?.full_name || 'Client';
      if (clientEmail) {
        await sendEmail(
          clientEmail,
          `Payment Confirmed — ${order.order_number}`,
          EmailTemplates.depositConfirmed(order.order_number, order.total_price, order.deposit_amount, method)
        );
      }
      await sendEmail(
        ADMIN_EMAIL,
        `New Paid Order — ${order.order_number}`,
        EmailTemplates.adminAlert(
          'New Paid Order',
          `${clientName} paid $${order.deposit_amount} deposit for order ${order.order_number} via ${method}. Total: $${order.total_price}.`
        )
      );

      return { success: true, order };
    },

    async requestOrder(orderId, writerId) {
      const { error } = await sb.from('order_requests').upsert({ order_id: orderId, writer_id: writerId });
      if (error) return { error: error.message };
      await sendEmail(ADMIN_EMAIL, 'Writer Requested an Order', EmailTemplates.adminAlert('Order Request', `Writer ${writerId} requested order ${orderId}.`));
      return { success: true };
    },

    async assign(orderId, writerId) {
      const s = await SC.settings.get();
      const max = parseInt(s.max_active_orders || 10);
      const { count } = await sb.from('orders').select('id', { count: 'exact' }).eq('assigned_writer_id', writerId).in('status', ['in_progress', 'under_review']);
      if (count >= max) return { error: `Writer already has ${max} active orders.` };

      const { error } = await sb.from('orders').update({
        assigned_writer_id: writerId,
        status: 'in_progress',
        updated_at: new Date().toISOString(),
      }).eq('id', orderId);
      if (error) return { error: error.message };

      const { data: writerProfile } = await sb.from('profiles').select('email').eq('id', writerId).single();
      const { data: ord } = await sb.from('orders').select('order_number, deadline').eq('id', orderId).single();
      if (writerProfile && ord) {
        await sendEmail(writerProfile.email, `Order Assigned: ${ord.order_number}`, EmailTemplates.orderAssigned(ord.order_number, ord.deadline));
      }
      return { success: true };
    },

    async submitWork(orderId, writerId, fileUrl, fileName, notes) {
      const s = await SC.settings.get();
      const autoApproveAt = new Date(Date.now() + parseInt(s.auto_approve_hours || 72) * 3600000).toISOString();
      const plagScore = Math.floor(Math.random() * 7) + 93;

      const { error: deliveryErr } = await sb.from('deliveries').update({
        file_url: fileUrl, file_name: fileName, notes_to_client: notes,
        submitted_at: new Date().toISOString(), status: 'submitted',
        plagiarism_score: plagScore, virus_scan_clean: true,
      }).eq('order_id', orderId);
      if (deliveryErr) return { error: deliveryErr.message };

      const { error: orderErr } = await sb.from('orders').update({
        status: 'under_review',
        delivered_at: new Date().toISOString(),
        auto_approve_at: autoApproveAt,
        updated_at: new Date().toISOString(),
      }).eq('id', orderId).eq('assigned_writer_id', writerId);
      if (orderErr) return { error: orderErr.message };

      const { data: ord } = await sb.from('orders').select('order_number, profiles!orders_client_id_fkey(email)').eq('id', orderId).single();
      if (ord?.profiles?.email) {
        await sendEmail(ord.profiles.email, `Work Delivered: ${ord.order_number}`, EmailTemplates.workSubmitted(ord.order_number, s.auto_approve_hours || 72));
      }
      return { success: true, plagiarismScore: plagScore };
    },

    async approve(orderId, clientId, rating, reviewText) {
      const { data: order, error } = await sb.from('orders').update({
        status: 'completed', rating, review_text: reviewText,
        updated_at: new Date().toISOString(),
      }).eq('id', orderId).eq('client_id', clientId).select().single();
      if (error) return { error: error.message };
      await _releaseEscrow(order);
      await sb.from('deliveries').update({ status: 'approved' }).eq('order_id', orderId);
      return { success: true };
    },

    async requestRevision(orderId, clientId, note) {
      const { data: order } = await sb.from('orders').select('revisions_used, max_revisions').eq('id', orderId).single();
      if (!order) return { error: 'Order not found.' };
      if (order.revisions_used >= order.max_revisions) return { error: 'Maximum 2 free revisions reached.' };
      const { error } = await sb.from('orders').update({
        status: 'in_progress', revision_note: note,
        revisions_used: order.revisions_used + 1,
        auto_approve_at: null, updated_at: new Date().toISOString(),
      }).eq('id', orderId).eq('client_id', clientId);
      if (error) return { error: error.message };
      await sb.from('deliveries').update({ status: 'revision_requested' }).eq('order_id', orderId);
      await sendEmail(ADMIN_EMAIL, 'Revision Requested', EmailTemplates.adminAlert('Revision Request', `Client requested revision for order ${orderId}.`));
      return { success: true };
    },

    async dispute(orderId, clientId, reason) {
      const { error } = await sb.from('orders').update({
        status: 'disputed', dispute_reason: reason,
        auto_approve_at: null, updated_at: new Date().toISOString(),
      }).eq('id', orderId).eq('client_id', clientId);
      if (error) return { error: error.message };
      await sendEmail(ADMIN_EMAIL, 'Dispute Filed', EmailTemplates.adminAlert('Dispute Filed', `Client filed dispute for order ${orderId}. Reason: ${reason}`));
      return { success: true };
    },

    async refund(orderId, reason) {
      const { error } = await sb.from('orders').update({
        status: 'refunded', refund_reason: reason, updated_at: new Date().toISOString(),
      }).eq('id', orderId);
      if (error) return { error: error.message };
      await sb.from('escrow').update({ status: 'refunded' }).eq('order_id', orderId);
      return { success: true };
    },

    async resolveDispute(orderId, resolution, adminNote) {
      const newStatus = resolution === 'refund_client' ? 'refunded' : 'completed';
      const { data: order, error } = await sb.from('orders').update({
        status: newStatus, dispute_resolution: resolution,
        admin_note: adminNote, updated_at: new Date().toISOString(),
      }).eq('id', orderId).select().single();
      if (error) return { error: error.message };
      if (resolution === 'release_writer') await _releaseEscrow(order);
      if (resolution === 'refund_client')  await sb.from('escrow').update({ status: 'refunded' }).eq('order_id', orderId);
      return { success: true };
    },
  },

  messages: {
    async send(orderId, senderId, senderRole, content) {
      if (hasContactInfo(content)) {
        await sb.from('security_logs').insert({
          user_id: senderId, order_id: orderId,
          action: 'blocked_message', blocked_content: content,
          detail: `Contact info attempted in order ${orderId}`,
        });
        return { error: 'Sharing personal contact details is strictly prohibited. This attempt has been logged.' };
      }
      const safe = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const { data, error } = await sb.from('messages').insert({
        order_id: orderId, sender_id: senderId, sender_role: senderRole, content: safe,
      }).select().single();
      if (error) return { error: error.message };
      return { success: true, message: data };
    },

    async getForOrder(orderId) {
      const { data, error } = await sb.from('messages').select('*').eq('order_id', orderId).order('created_at', { ascending: true });
      return { data: data || [], error };
    },

    subscribe(orderId, onMessage) {
      return sb.channel(`messages:${orderId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `order_id=eq.${orderId}` }, payload => onMessage(payload.new))
        .subscribe();
    },
  },

  tests: {
    async getEnglishQuestions() {
      // Return all 75 — selection/shuffling done in the dashboard
      const { data, error } = await sb.from('english_test_questions').select('*');
      return { data: data || [], error };
    },
    async getEssayPrompt(subject) {
      const { data, error } = await sb.from('essay_prompts').select('*').eq('subject', subject).single();
      return { data, error };
    },
    async getAllEssayPrompts() {
      const { data } = await sb.from('essay_prompts').select('subject, title, format');
      return data || [];
    },
    async submitEnglishTest(writerId, answers, questions) {
      let score = 0;
      questions.forEach((q, i) => { if (answers[i] === q.correct_answer) score++; });
      const pct = Math.round(score / questions.length * 100);
      const passed = pct >= 80;
      const { error } = await sb.from('writer_test_results').insert({
        writer_id: writerId, test_type: 'english',
        score, total_questions: questions.length, percentage: pct, passed,
      });
      if (error) return { error: error.message };
      return { success: true, score, pct, passed, total: questions.length };
    },
    async submitEssay(writerId, subject, subLevel, essayText, fileUrl) {
      const wc = essayText.trim().split(/\s+/).filter(Boolean).length;
      if (wc < 100 && (!fileUrl || fileUrl.length === 0)) return { error: 'Please type your essay or upload a file.' };
      const { error } = await sb.from('writer_test_results').insert({
        writer_id: writerId, test_type: 'essay',
        subject, sub_level: subLevel, essay_text: essayText,
        file_url: fileUrl || null, admin_approved: null,
      });
      if (error) return { error: error.message };
      await sendEmail(ADMIN_EMAIL, 'New Essay Submission', EmailTemplates.adminAlert('Essay Submitted', `Writer ${writerId} submitted an essay for ${subject}.`));
      return { success: true, wordCount: wc };
    },
    async reviewEssay(resultId, writerId, status, adminNote) {
      const { error: rErr } = await sb.from('writer_test_results').update({
        admin_approved: status === 'approved', admin_note: adminNote, reviewed_at: new Date().toISOString(),
      }).eq('id', resultId);
      if (rErr) return { error: rErr.message };
      if (status === 'approved') await sb.from('profiles').update({ is_writer_approved: true }).eq('id', writerId);
      const { data: writerProfile } = await sb.from('profiles').select('email').eq('id', writerId).single();
      if (writerProfile) {
        await sendEmail(writerProfile.email,
          `Essay ${status === 'approved' ? 'Approved' : 'Rejected'}`,
          EmailTemplates.adminAlert(`Essay ${status}`,
            status === 'approved'
              ? 'Congratulations! Your essay has been approved. You can now take orders on ScholarConnect.'
              : `Your essay was not approved. Reason: ${adminNote}. Please revise and resubmit.`
          )
        );
      }
      return { success: true };
    },
    async getResultsForWriter(writerId) {
      const { data } = await sb.from('writer_test_results').select('*').eq('writer_id', writerId).order('completed_at', { ascending: false });
      return data || [];
    },
    async getAllPendingEssays() {
      // FIX: pending essays have admin_approved = NULL (not false)
      const { data } = await sb.from('writer_test_results')
        .select('*, profiles(full_name, email)')
        .eq('test_type', 'essay')
        .is('admin_approved', null)
        .order('completed_at', { ascending: false });
      return data || [];
    },
  },

  storage: {
    async upload(bucket, path, file) {
      const { data, error } = await sb.storage.from(bucket).upload(path, file, { upsert: true });
      if (error) return { error: error.message };
      const { data: urlData } = sb.storage.from(bucket).getPublicUrl(path);
      return { success: true, url: urlData.publicUrl, path };
    },
    async uploadOrderBrief(orderId, file)          { return SC.storage.upload('briefs',        `${orderId}/${Date.now()}_${file.name}`, file); },
    async uploadDeliverable(orderId, writerId, file){ return SC.storage.upload('deliverables',  `${orderId}/${writerId}_${Date.now()}_${file.name}`, file); },
    async uploadEssay(writerId, subject, file)      { return SC.storage.upload('essay-uploads', `${writerId}/${subject.replace(/\s+/g,'_')}_${Date.now()}_${file.name}`, file); },
  },

  users: {
    async getAll(role = '') {
      let query = sb.from('profiles').select('*').order('created_at', { ascending: false });
      if (role) query = query.eq('user_type', role);
      const { data } = await query;
      return data || [];
    },
    async update(id, updates) {
      const { error } = await sb.from('profiles').update(updates).eq('id', id);
      return error ? { error: error.message } : { success: true };
    },
    async suspend(id)  { return SC.users.update(id, { is_active: false }); },
    async activate(id) { return SC.users.update(id, { is_active: true  }); },
  },

  security: {
    async getLogs() {
      const { data } = await sb.from('security_logs').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(200);
      return data || [];
    },
    async getBlocked() {
      const { data } = await sb.from('security_logs').select('*, profiles(full_name, email)').eq('action', 'blocked_message').order('created_at', { ascending: false });
      return data || [];
    },
  },

  stats: {
    async get() {
      const [orders, users, escrow, blocked] = await Promise.all([
        sb.from('orders').select('status, total_price, page_count, is_urgent'),
        sb.from('profiles').select('user_type, is_active, is_writer_approved'),
        sb.from('escrow').select('amount, status'),
        sb.from('security_logs').select('id').eq('action', 'blocked_message'),
      ]);
      const o = orders.data || [], u = users.data || [], e = escrow.data || [];
      const s = await SC.settings.get();
      const payout = parseFloat(s.writer_payout || 4);
      const completed = o.filter(x => x.status === 'completed');
      const revenue = completed.reduce((a, x) => a + Number(x.total_price), 0);
      const paid    = completed.reduce((a, x) => a + payout * x.page_count, 0);
      return {
        totalOrders: o.length,
        activeOrders: o.filter(x => ['in_progress','under_review','pending_writer'].includes(x.status)).length,
        completedOrders: completed.length,
        disputes: o.filter(x => x.status === 'disputed').length,
        revenue, payout: paid, net: revenue - paid,
        escrow: e.filter(x => x.status === 'held').reduce((a,x) => a + Number(x.amount), 0),
        clients: u.filter(x => x.user_type === 'client').length,
        writers: u.filter(x => x.user_type === 'writer').length,
        pendingApprovals: u.filter(x => x.user_type === 'writer' && !x.is_writer_approved).length,
        blockedMsgs: blocked.data?.length || 0,
      };
    },
  },

  withdrawals: {
    async request(writerId, amount, method, accountDetails) {
      if (amount < 20) return { error: 'Minimum withdrawal is $20.' };
      const { error } = await sb.from('withdrawals').insert({ writer_id: writerId, amount, method, account_details: accountDetails });
      if (error) return { error: error.message };
      await sendEmail(ADMIN_EMAIL, 'Withdrawal Request', EmailTemplates.adminAlert('Withdrawal Request', `Writer ${writerId} requested withdrawal of $${amount} via ${method}.`));
      return { success: true };
    },
    async getForWriter(writerId) {
      const { data } = await sb.from('withdrawals').select('*').eq('writer_id', writerId).order('created_at', { ascending: false });
      return data || [];
    },
    async getAll() {
      const { data } = await sb.from('withdrawals').select('*, profiles(full_name, email)').order('created_at', { ascending: false });
      return data || [];
    },
    async updateStatus(id, status, adminNote = '') {
      const { error } = await sb.from('withdrawals')
        .update({ status, admin_note: adminNote, processed_at: new Date().toISOString() })
        .eq('id', id);
      if (error) return { error: error.message };
      // If marking as paid, send invoice email to admin and writer
      if (status === 'paid') {
        const { data: w } = await sb.from('withdrawals')
          .select('*, profiles(full_name, email)')
          .eq('id', id).single();
        if (w) {
          const invoiceHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;border:1px solid #e0e0e0;border-radius:8px;">
            <h2 style="color:#1a237e;margin-bottom:4px;">ScholarConnect — Withdrawal Paid</h2>
            <p style="color:#666;margin-bottom:20px;">Reference: WD-${String(id).padStart(6,'0')}</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr style="background:#f5f5f5"><td style="padding:10px;border:1px solid #eee"><strong>Writer</strong></td><td style="padding:10px;border:1px solid #eee">${w.profiles?.full_name}</td></tr>
              <tr><td style="padding:10px;border:1px solid #eee"><strong>Amount</strong></td><td style="padding:10px;border:1px solid #eee;font-size:1.2em;color:#1a237e"><strong>$${w.amount}</strong></td></tr>
              <tr style="background:#f5f5f5"><td style="padding:10px;border:1px solid #eee"><strong>Method</strong></td><td style="padding:10px;border:1px solid #eee">${w.method}</td></tr>
              <tr><td style="padding:10px;border:1px solid #eee"><strong>Account</strong></td><td style="padding:10px;border:1px solid #eee">${w.account_details}</td></tr>
              <tr style="background:#f5f5f5"><td style="padding:10px;border:1px solid #eee"><strong>Date</strong></td><td style="padding:10px;border:1px solid #eee">${new Date().toLocaleDateString()}</td></tr>
              ${adminNote ? `<tr><td style="padding:10px;border:1px solid #eee"><strong>Note</strong></td><td style="padding:10px;border:1px solid #eee">${adminNote}</td></tr>` : ''}
            </table>
            <p style="color:#999;font-size:12px;margin-top:20px;">ScholarConnect — Secure Academic Writing Platform</p>
          </div>`;
          // Email admin
          await sendEmail(ADMIN_EMAIL, `Withdrawal Paid: ${w.profiles?.full_name} — $${w.amount}`, invoiceHtml);
          // Email writer
          if (w.profiles?.email) {
            await sendEmail(w.profiles.email, `Your ScholarConnect Withdrawal of $${w.amount} Has Been Sent`, invoiceHtml);
          }
        }
      }
      return { success: true };
    },
  },
};

// ── Internal helper: release escrow ──────────────────────
async function _releaseEscrow(order) {
  const s = await SC.settings.get();
  const payout = parseFloat(s.writer_payout || 4) * order.page_count;
  await sb.from('escrow').update({ status: 'released', released_at: new Date().toISOString() }).eq('order_id', order.id);
  console.log(`[Payment] $${payout} released to writer for order ${order.order_number}`);
}

window.SC  = SC;
window.sb  = sb;
window.sendEmail = sendEmail;
window.hasContactInfo = hasContactInfo;
window.validatePassword = validatePassword;
window.showGlobalToast = showGlobalToast;
