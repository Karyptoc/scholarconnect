<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>ScholarConnect – Admin Panel</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    .admin-bar{background:var(--navy);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
    .admin-logo{font-family:var(--font-display);font-size:1.2rem;font-weight:900;color:white;display:flex;align-items:center;gap:10px;}
    .admin-pill{background:rgba(212,168,64,0.25);color:var(--gold2);font-size:0.7rem;font-weight:700;padding:2px 9px;border-radius:4px;border:1px solid rgba(212,168,64,0.3);}
    .anav{display:flex;gap:4px;align-items:center;}
    .anav-btn{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.65);font-size:0.85rem;font-weight:500;padding:8px 13px;border-radius:6px;transition:all 0.2s;font-family:var(--font-body);}
    .anav-btn:hover,.anav-btn.active{background:rgba(255,255,255,0.1);color:white;}
    .search-bar{display:flex;gap:8px;margin-bottom:16px;align-items:center;}
    .search-bar input{flex:1;max-width:320px;}
    .window-status-open{background:rgba(58,158,110,0.15);border:1px solid var(--success);border-radius:8px;padding:10px 16px;color:var(--success);font-weight:600;font-size:0.875rem;}
    .window-status-closed{background:rgba(224,85,85,0.1);border:1px solid var(--danger);border-radius:8px;padding:10px 16px;color:var(--danger);font-weight:600;font-size:0.875rem;}
  </style>
</head>
<body>

<!-- Admin Bar -->
<div id="admin-bar" style="display:none">
  <div class="admin-bar">
    <div class="admin-logo"><svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M14 3L3 9v10l11 6 11-6V9L14 3z" fill="rgba(255,255,255,0.15)"/><path d="M14 8l6 3.5v7L14 22l-6-3.5v-7L14 8z" fill="var(--gold2)"/></svg>ScholarConnect <span class="admin-pill">ADMIN</span></div>
    <div class="anav" id="admin-tabs">
      <button class="anav-btn active" onclick="showTab('overview')">Overview</button>
      <button class="anav-btn" onclick="showTab('orders')">Orders</button>
      <button class="anav-btn" onclick="showTab('users')">Users</button>
      <button class="anav-btn" onclick="showTab('essays')">Essays <span id="essay-badge" class="badge badge-warning" style="display:none;margin-left:3px">0</span></button>
      <button class="anav-btn" onclick="showTab('applications')">Applications <span id="app-badge" class="badge badge-warning" style="display:none;margin-left:3px">0</span></button>
      <button class="anav-btn" onclick="showTab('security')">Security</button>
      <button class="anav-btn" onclick="showTab('logs')">Logs</button>
      <button class="anav-btn" onclick="showTab('settings')">Settings</button>
      <button class="anav-btn" onclick="showTab('messages')">Messages <span id="msg-badge" class="badge badge-warning" style="display:none;margin-left:3px">0</span></button>
    </div>
    <div class="flex-gap">
      <button class="theme-toggle" id="theme-btn"></button>
      <button class="btn btn-sm" style="background:rgba(255,255,255,0.12);color:white;border:1px solid rgba(255,255,255,0.2)" onclick="SC.auth.logout()">Log Out</button>
    </div>
  </div>
</div>

<!-- FIRST-TIME PASSWORD SETUP -->
<div id="page-setup" style="display:none;min-height:100vh;align-items:center;justify-content:center;padding:40px">
  <div style="max-width:440px;width:100%;margin:0 auto">
    <div style="text-align:center;margin-bottom:32px">
      <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--gold),var(--amber));border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div>
      <h1 style="font-family:var(--font-display);font-size:1.8rem;margin-bottom:8px">Admin Setup</h1>
      <p class="text-muted">Welcome! Set your admin password to secure the platform.</p>
    </div>
    <div class="alert alert-warning"><span>⚠️</span><span>Choose a strong password — min 8 chars, uppercase, number, special character.</span></div>
    <div id="setup-err" class="alert alert-danger" style="display:none"></div>
    <div class="form-group"><label class="form-label">New Admin Password *</label><input type="password" class="form-input" id="setup-pass" placeholder="Min 8 chars, uppercase, number, special char" oninput="checkSetupPw()"><div class="strength-bar" id="setup-bar" style="background:var(--warm)"></div></div>
    <div class="form-group"><label class="form-label">Confirm Password *</label><input type="password" class="form-input" id="setup-conf" placeholder="Re-enter password"></div>
    <button class="btn btn-gold btn-full btn-lg" onclick="doSetup()">Set Password &amp; Enter Panel →</button>
  </div>
</div>

<!-- ADMIN LOGIN -->
<div id="page-login" style="display:none;min-height:100vh;align-items:center;justify-content:center;padding:40px">
  <div style="max-width:440px;width:100%;margin:0 auto">
    <div style="text-align:center;margin-bottom:32px">
      <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--navy2),var(--slate));border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg></div>
      <h1 style="font-family:var(--font-display);font-size:1.8rem;margin-bottom:8px">Admin Login</h1>
      <p class="text-muted">Restricted access. Authorised personnel only.</p>
    </div>
    <div id="login-err" class="alert alert-danger" style="display:none"></div>
    <div class="form-group"><label class="form-label">Admin Email</label><input type="email" class="form-input" id="a-email" placeholder="Admin email address" autocomplete="off"></div>
    <div class="form-group"><label class="form-label">Admin Password</label><input type="password" class="form-input" id="a-pass" placeholder="Enter admin password" autocomplete="current-password"></div>
    <button class="btn btn-primary btn-full btn-lg" id="login-btn" onclick="doLogin()">Access Admin Panel →</button>
    <p style="text-align:center;margin-top:16px;font-size:0.875rem"><a href="index.html" style="color:var(--muted)">← Back to site</a></p>
  </div>
</div>

<!-- ADMIN 2FA -->
<div id="page-2fa" style="display:none;min-height:100vh;align-items:center;justify-content:center;padding:40px">
  <div style="max-width:440px;width:100%;margin:0 auto">
    <div style="text-align:center;margin-bottom:32px">
      <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--navy2),var(--slate));border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg></div>
      <h1 style="font-family:var(--font-display);font-size:1.8rem;margin-bottom:8px">Verify Identity</h1>
      <p class="text-muted">A 6-digit code was sent to <strong id="tfa-email-display"></strong></p>
    </div>
    <div id="tfa-err" class="alert alert-danger" style="display:none"></div>
    <div class="form-group">
      <label class="form-label">6-Digit Security Code</label>
      <input type="text" class="form-input" id="tfa-code" placeholder="000000" maxlength="6" inputmode="numeric" style="font-size:1.5rem;letter-spacing:10px;text-align:center" autocomplete="one-time-code">
    </div>
    <button class="btn btn-primary btn-full btn-lg" onclick="do2FA()">Verify &amp; Enter →</button>
    <p style="text-align:center;margin-top:16px;font-size:0.875rem"><a onclick="document.getElementById('page-2fa').style.display='none';document.getElementById('page-login').style.display='flex';" style="cursor:pointer;color:var(--muted)">← Back</a></p>
  </div>
</div>

<!-- DASHBOARD -->
<div id="page-dashboard" style="display:none;padding:32px;max-width:1440px;margin:0 auto">

  <!-- OVERVIEW -->
  <div class="tab-pane active" id="tab-overview">
    <div class="page-header flex-between">
      <div><div class="page-title">Platform Overview</div><div class="page-subtitle" id="ov-date"></div></div>
      <div class="flex-gap">
        <button class="btn btn-outline btn-sm" onclick="exportCSV()">📊 Export Revenue CSV</button>
      </div>
    </div>
    <div class="grid-4" style="margin-bottom:24px" id="ov-stats"><div class="loading"><div class="spinner"></div></div></div>
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card"><div class="flex-between" style="margin-bottom:14px"><h3 style="font-family:var(--font-display)">Revenue – 7 Days</h3></div><canvas id="rev-chart" height="200"></canvas></div>
      <div class="card"><h3 style="font-family:var(--font-display);margin-bottom:14px">Order Status</h3><canvas id="status-chart" height="200"></canvas></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
      <div class="card">
        <div class="flex-between" style="margin-bottom:14px">
          <h3 style="font-family:var(--font-display)">💰 Escrow Holdings</h3>
          <span class="badge badge-gold" id="ov-escrow-count">—</span>
        </div>
        <div id="ov-escrow" style="max-height:280px;overflow-y:auto"></div>
      </div>
      <div class="card">
        <div class="flex-between" style="margin-bottom:14px">
          <h3 style="font-family:var(--font-display)">🕐 Recent Activity</h3>
          <button class="btn btn-ghost btn-sm" onclick="showTab('logs')">View all →</button>
        </div>
        <div id="ov-activity" style="max-height:280px;overflow-y:auto"></div>
      </div>
    </div>
  </div>

  <!-- ORDERS -->
  <div class="tab-pane" id="tab-orders" style="display:none">
    <div class="page-header flex-between">
      <div><div class="page-title">Order Management</div></div>
      <div class="flex-gap">
        <input type="text" class="form-input" id="ord-search" placeholder="Search order #, subject, writer…" style="width:220px" oninput="renderOrders()">
        <select class="form-select" id="ord-filter" style="width:170px" onchange="renderOrders()">
          <option value="">All Statuses</option>
          <option value="pending_payment">Pending Payment</option>
          <option value="pending_writer">Pending Writer</option>
          <option value="in_progress">In Progress</option>
          <option value="under_review">Under Review</option>
          <option value="completed">Completed</option>
          <option value="disputed">Disputed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Order #</th><th>Subject / Level</th><th>Client (Private)</th><th>Pages / $</th><th>Status</th><th>Writer</th><th>Submitted Work</th><th>Deadline</th><th>Actions</th></tr></thead>
      <tbody id="ord-tbody"><tr><td colspan="9" style="text-align:center;padding:30px"><div class="spinner" style="margin:0 auto"></div></td></tr></tbody>
    </table></div>
  </div>

  <!-- USERS -->
  <div class="tab-pane" id="tab-users" style="display:none">
    <div class="page-header flex-between">
      <div><div class="page-title">User Management</div></div>
      <div class="flex-gap">
        <button class="tab active" id="ut-client" onclick="renderUsers('client')" style="border:none;background:none;cursor:pointer;padding:8px 14px;font-weight:600;border-bottom:2px solid var(--navy2)">Clients</button>
        <button class="tab" id="ut-writer" onclick="renderUsers('writer')" style="border:none;background:none;cursor:pointer;padding:8px 14px;font-weight:600;border-bottom:2px solid transparent">Writers</button>
        <input type="text" class="form-input" id="user-search" placeholder="Search name / email…" style="width:200px" autocomplete="off" oninput="renderUsers(curUserTab)">
      </div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Name</th><th>Email (PRIVATE)</th><th>IP / Last Login</th><th>Status / 2FA</th><th>Consent</th><th>Joined</th><th>Actions</th></tr></thead>
      <tbody id="user-tbody"></tbody>
    </table></div>
  </div>

  <!-- ESSAYS -->
  <div class="tab-pane" id="tab-essays" style="display:none">
    <div class="page-header"><div class="page-title">Subject Essay Review</div><div class="page-subtitle">Review and approve/reject writer subject essays. Each must be ≥1,250 words.</div></div>
    <div class="tabs">
      <button class="tab active" id="et-pending" onclick="renderEssays('pending')">Pending</button>
      <button class="tab" id="et-approved" onclick="renderEssays('approved')">Approved</button>
      <button class="tab" id="et-rejected" onclick="renderEssays('rejected')">Rejected</button>
    </div>
    <div id="essays-list"><div class="loading"><div class="spinner"></div></div></div>
  </div>

  <!-- WRITER APPLICATIONS -->
  <div class="tab-pane" id="tab-applications" style="display:none">
    <div class="page-header flex-between">
      <div><div class="page-title">Writer Applications</div><div class="page-subtitle">Control when writers can apply to join the platform</div></div>
      <div class="flex-gap" id="app-window-controls"></div>
    </div>
    <div id="app-window-status" style="margin-bottom:24px"></div>
    <div class="card" style="margin-bottom:20px">
      <h3 style="font-family:var(--font-display);margin-bottom:16px">Application Window Settings</h3>
      <div class="grid-2" style="gap:16px;margin-bottom:16px">
        <div class="form-group">
          <label class="form-label">Open From Date</label>
          <input type="datetime-local" class="form-input" id="app-open-date">
        </div>
        <div class="form-group">
          <label class="form-label">Close On Date</label>
          <input type="datetime-local" class="form-input" id="app-close-date">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Message to Applicants (shown on registration page)</label>
        <textarea class="form-textarea" id="app-message" placeholder="e.g. We are currently accepting new writer applications. Apply before December 31st…"></textarea>
      </div>
      <div class="flex-gap">
        <button class="btn btn-success" onclick="openApplicationWindow()">✅ Open Applications Now</button>
        <button class="btn btn-danger" onclick="closeApplicationWindow()">🚫 Close Applications Now</button>
        <button class="btn btn-primary" onclick="saveAppWindowSettings()">💾 Save Schedule</button>
      </div>
    </div>
    <div class="card">
      <h3 style="font-family:var(--font-display);margin-bottom:16px">Pending Writer Applications</h3>
      <div id="pending-applications"><div class="loading"><div class="spinner"></div></div></div>
    </div>
  </div>

  <!-- MESSAGES -->
  <div class="tab-pane" id="tab-messages" style="display:none">
    <div class="page-header"><div class="page-title">Messages</div><div class="page-subtitle">Direct messages to clients and writers</div></div>
    <div class="search-bar">
      <input type="text" class="form-input" id="msg-search" placeholder="Search by name, email, or order number…" oninput="filterConversations()">
    </div>
    <div class="grid-2" style="gap:20px">
      <div class="card" id="compose-card">
        <h3 style="font-family:var(--font-display);margin-bottom:16px">Compose Message</h3>
        <div class="form-group">
          <label class="form-label">Recipient *</label>
          <select class="form-select" id="msg-recipient"><option value="">Select user...</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Subject *</label>
          <input type="text" class="form-input" id="msg-subject" placeholder="e.g. Update on order ORD-ABC123">
        </div>
        <div class="form-group">
          <label class="form-label">Message *</label>
          <textarea class="form-textarea" id="msg-content" style="min-height:120px" placeholder="Type your message here..."></textarea>
        </div>
        <div id="msg-err" class="alert alert-danger" style="display:none"></div>
        <button class="btn btn-primary btn-full" onclick="sendDirectMessage()">Send Message</button>
      </div>
      <div class="card">
        <h3 style="font-family:var(--font-display);margin-bottom:16px">Conversations</h3>
        <div id="msg-history"><div class="loading"><div class="spinner"></div></div></div>
      </div>
    </div>
  </div>

  <!-- SECURITY -->
  <div class="tab-pane" id="tab-security" style="display:none">
    <div class="page-header"><div class="page-title">Security &amp; Disputes</div></div>
    <div class="grid-3" style="margin-bottom:24px">
      <div class="stat-card"><div class="stat-value" id="sec-blocked">—</div><div class="stat-label">Blocked Contact Attempts</div></div>
      <div class="stat-card"><div class="stat-value" id="sec-disputes">—</div><div class="stat-label">Active Disputes</div></div>
      <div class="stat-card"><div class="stat-value" id="sec-withdrawals">—</div><div class="stat-label">Pending Withdrawals</div></div>
    </div>
    <div class="card" style="margin-bottom:20px"><div class="flex-between" style="margin-bottom:14px"><h3 style="font-family:var(--font-display)">🛡️ Blocked Contact Attempts</h3><span class="badge badge-danger" id="bl-count">0</span></div><div id="blocked-list"></div></div>
    <div class="card" style="margin-bottom:20px"><h3 style="font-family:var(--font-display);margin-bottom:14px">⚖️ Active Disputes</h3><div id="disputes-list"></div></div>
    <div class="card"><h3 style="font-family:var(--font-display);margin-bottom:14px">💸 Withdrawal Requests</h3><div id="withdrawals-list"></div></div>
  </div>

  <!-- LOGS -->
  <div class="tab-pane" id="tab-logs" style="display:none">
    <div class="page-header flex-between">
      <div><div class="page-title">Activity Logs</div><div class="page-subtitle">IP address, login times, and actions for all users</div></div>
      <div class="flex-gap">
        <select class="form-select" id="log-filter" style="width:160px" onchange="renderLogs()"><option value="">All Actions</option><option value="blocked_message">Blocked Messages</option><option value="failed_login">Failed Logins</option></select>
        <input type="text" class="form-input" id="log-search" placeholder="Search…" style="width:180px" oninput="renderLogs()">
      </div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Time</th><th>User</th><th>Role</th><th>Action</th><th>Detail</th><th>IP Address</th></tr></thead>
      <tbody id="log-tbody"></tbody>
    </table></div>
  </div>

  <!-- SETTINGS -->
  <div class="tab-pane" id="tab-settings" style="display:none">
    <div class="page-header"><div class="page-title">Platform Settings</div><div class="page-subtitle">Pricing changes apply to new orders only</div></div>
    <div class="grid-2">
      <div style="display:flex;flex-direction:column;gap:20px">
        <div class="card">
          <h3 style="font-family:var(--font-display);margin-bottom:16px">💰 Pricing</h3>
          <div class="alert alert-warning">⚠️ Changes apply to new orders only.</div>
          <div class="form-group"><label class="form-label">Standard Rate ($/page, ≥5 days)</label><input type="number" class="form-input" id="s-std" min="1"></div>
          <div class="form-group"><label class="form-label">Urgent Rate ($/page, &lt;5 days)</label><input type="number" class="form-input" id="s-urg" min="1"></div>
          <div class="form-group"><label class="form-label">Urgent Threshold (days)</label><input type="number" class="form-input" id="s-thresh" min="1"></div>
          <div class="form-group"><label class="form-label">Writer Payout ($/page)</label><input type="number" class="form-input" id="s-pay" min="1"></div>
          <div class="form-group"><label class="form-label">Max Active Orders per Writer</label><input type="number" class="form-input" id="s-max" min="1" max="10"></div>
          <div class="form-group"><label class="form-label">Auto-Approve Hours (after delivery)</label><input type="number" class="form-input" id="s-auto"></div>
          <button class="btn btn-primary" onclick="saveSettings()">Save Settings</button>
        </div>
        <div class="card">
          <h3 style="font-family:var(--font-display);margin-bottom:16px">🔑 Change Admin Password</h3>
          <div class="alert alert-info">The admin email is fixed and cannot be changed.</div>
          <div class="form-group"><label class="form-label">Current Password *</label><input type="password" class="form-input" id="cp-curr"></div>
          <div class="form-group"><label class="form-label">New Password *</label><input type="password" class="form-input" id="cp-new" oninput="checkCpPw()"><div class="strength-bar" id="cp-bar" style="background:var(--warm)"></div></div>
          <div class="form-group"><label class="form-label">Confirm New Password *</label><input type="password" class="form-input" id="cp-conf"></div>
          <div id="cp-err" class="alert alert-danger" style="display:none"></div>
          <button class="btn btn-outline" onclick="changePassword()">Update Password</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div class="card">
          <h3 style="font-family:var(--font-display);margin-bottom:16px">🅿️ Payment Details</h3>
          <div class="form-group"><label class="form-label">PayPal Email</label><input type="email" class="form-input" id="s-pp"></div>
          <div class="form-group"><label class="form-label">Bank Name</label><input type="text" class="form-input" id="s-bn"></div>
          <div class="form-group"><label class="form-label">Account Number</label><input type="text" class="form-input" id="s-ba"></div>
          <div class="form-group"><label class="form-label">Sort / Routing Code</label><input type="text" class="form-input" id="s-bs"></div>
          <div class="form-group"><label class="form-label">SWIFT / BIC</label><input type="text" class="form-input" id="s-bw"></div>
          <button class="btn btn-primary" onclick="saveSettings()">Save Payment Details</button>
        </div>
        <div class="card"><h3 style="font-family:var(--font-display);margin-bottom:14px">📊 Revenue Summary</h3><div id="rev-summary"></div></div>
      </div>
    </div>
  </div>

</div><!-- end dashboard -->

<!-- MODALS -->
<!-- Full Instructions Modal -->
<div class="modal-overlay" id="m-instructions">
  <div class="modal" style="max-width:800px;max-height:90vh">
    <div class="modal-header">
      <div>
        <div class="modal-title" id="m-inst-title">Order Instructions</div>
        <div id="m-inst-meta" style="font-size:0.82rem;color:var(--muted);margin-top:4px"></div>
      </div>
      <button class="modal-close" onclick="closeM('m-instructions')">×</button>
    </div>
    <div style="overflow-y:auto;max-height:calc(90vh - 120px)">
      <div id="m-inst-body" style="font-size:0.9rem;line-height:1.8;white-space:pre-wrap;padding:4px 0"></div>
      <div id="m-inst-files" style="margin-top:16px"></div>
    </div>
  </div>
</div>

<!-- Assign -->
<div class="modal-overlay" id="m-assign">
  <div class="modal"><div class="modal-header"><div class="modal-title">Assign Writer</div><button class="modal-close" onclick="closeM('m-assign')">×</button></div>
  <div id="assign-info" style="background:var(--parch);border-radius:8px;padding:14px;margin-bottom:16px;font-size:0.875rem"></div>
  <div class="form-group"><label class="form-label">Select Writer</label><select class="form-select" id="assign-sel"></select></div>
  <button class="btn btn-primary btn-full" onclick="confirmAssign()">Assign Writer</button></div>
</div>

<!-- Order detail -->
<div class="modal-overlay" id="m-ord">
  <div class="modal" style="max-width:700px"><div class="modal-header"><div class="modal-title" id="m-ord-title">Order Detail</div><button class="modal-close" onclick="closeM('m-ord')">×</button></div>
  <div id="m-ord-body"></div></div>
</div>

<!-- Essay review -->
<div class="modal-overlay" id="m-essay">
  <div class="modal" style="max-width:720px"><div class="modal-header"><div class="modal-title">Review Subject Essay</div><button class="modal-close" onclick="closeM('m-essay')">×</button></div>
  <div id="er-header" style="background:var(--parch);border-radius:8px;padding:14px;margin-bottom:14px;font-size:0.875rem"></div>
  <div id="er-text" style="border:1px solid var(--border);border-radius:8px;padding:16px;max-height:300px;overflow-y:auto;font-size:0.875rem;line-height:1.8;margin-bottom:14px"></div>
  <div class="form-group"><label class="form-label">Admin Feedback *</label><textarea class="form-textarea" id="er-note" placeholder="Provide specific feedback for the writer…"></textarea></div>
  <div class="flex-gap"><button class="btn btn-success btn-full" onclick="doEssayReview(true)">✓ Approve Essay</button><button class="btn btn-danger btn-full" onclick="doEssayReview(false)">✗ Reject Essay</button></div></div>
</div>

<!-- Dispute -->
<div class="modal-overlay" id="m-dispute">
  <div class="modal"><div class="modal-header"><div class="modal-title">Resolve Dispute</div><button class="modal-close" onclick="closeM('m-dispute')">×</button></div>
  <div id="disp-info" style="background:var(--parch);border-radius:8px;padding:14px;margin-bottom:14px;font-size:0.875rem"></div>
  <div style="margin-bottom:14px"><strong style="font-size:0.875rem">Chat History:</strong><div id="disp-chat" style="border:1px solid var(--border);border-radius:8px;padding:12px;max-height:180px;overflow-y:auto;font-size:0.8rem;margin-top:8px"></div></div>
  <div class="form-group"><label class="form-label">Resolution</label><select class="form-select" id="disp-res"><option value="refund_client">Full Refund to Client</option><option value="partial_refund">Partial Refund (50%)</option><option value="release_writer">Release Payment to Writer</option></select></div>
  <div class="form-group"><label class="form-label">Decision Note *</label><textarea class="form-textarea" id="disp-note"></textarea></div>
  <button class="btn btn-primary btn-full" onclick="confirmDispute()">Apply Resolution</button></div>
</div>

<!-- Refund -->
<div class="modal-overlay" id="m-refund">
  <div class="modal"><div class="modal-header"><div class="modal-title">Issue Refund</div><button class="modal-close" onclick="closeM('m-refund')">×</button></div>
  <div id="refund-info" style="background:var(--parch);border-radius:8px;padding:14px;margin-bottom:14px;font-size:0.875rem"></div>
  <div class="form-group"><label class="form-label">Reason *</label><textarea class="form-textarea" id="refund-reason"></textarea></div>
  <button class="btn btn-danger btn-full" onclick="confirmRefund()">Issue Refund</button></div>
</div>

<!-- Remove User Confirmation -->
<div class="modal-overlay" id="m-remove-user">
  <div class="modal"><div class="modal-header"><div class="modal-title" style="color:var(--danger)">⚠️ Remove User from Platform</div><button class="modal-close" onclick="closeM('m-remove-user')">×</button></div>
  <div class="alert alert-danger" style="margin-bottom:16px">This will permanently deactivate the user and block their account. This action is for repeated offenders only.</div>
  <div id="remove-user-info" style="background:var(--parch);border-radius:8px;padding:14px;margin-bottom:16px;font-size:0.875rem"></div>
  <div class="form-group"><label class="form-label">Reason for Removal *</label><textarea class="form-textarea" id="remove-reason" placeholder="Describe the offense(s) that led to this removal…"></textarea></div>
  <div class="flex-gap">
    <button class="btn btn-danger btn-full" onclick="confirmRemoveUser()">Permanently Remove User</button>
    <button class="btn btn-outline btn-full" onclick="closeM('m-remove-user')">Cancel</button>
  </div></div>
</div>

<div class="toast-container" id="toasts"></div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script src="supabase-client.js"></script>
<script>
  async function do2FA() {
    const code = document.getElementById('tfa-code').value.trim();
    const err = document.getElementById('tfa-err');
    err.style.display = 'none';
    if (!code || code.length !== 6) { err.textContent = 'Please enter the 6-digit code.'; err.style.display = 'flex'; return; }
    const res = await SC.auth.verify2FA(code);
    if (res.error) { err.textContent = res.error; err.style.display = 'flex'; return; }
    if (res.profile.user_type !== 'admin') { err.textContent = 'Access denied. Admin only.'; err.style.display = 'flex'; return; }
    document.getElementById('page-2fa').style.display = 'none';
    adminProfile = res.profile;
    showDashboard();
  }

  if(localStorage.getItem('sc_theme')==='dark') document.documentElement.setAttribute('data-theme','dark');
  const tb=document.getElementById('theme-btn');
  if(localStorage.getItem('sc_theme')==='dark') tb.classList.add('on');
  tb.addEventListener('click',()=>{const d=document.documentElement.getAttribute('data-theme')==='dark';document.documentElement.setAttribute('data-theme',d?'':'dark');localStorage.setItem('sc_theme',d?'':'dark');tb.classList.toggle('on',!d);});

  document.getElementById('tfa-code')?.addEventListener('keydown',e=>{if(e.key==='Enter')do2FA();});

  let adminProfile = null;
  const existingProfile = SC.auth.getProfile();
  if (existingProfile && existingProfile.user_type === 'admin') { adminProfile = existingProfile; showDashboard(); }
  else { showLoginPage(); }

  function showLoginPage() {
    document.getElementById('page-setup').style.display = 'none';
    document.getElementById('page-login').style.display = 'flex';
    document.getElementById('page-dashboard').style.display = 'none';
    document.getElementById('admin-bar').style.display = 'none';
  }

  function showDashboard() {
    document.getElementById('page-setup').style.display = 'none';
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('page-2fa').style.display = 'none';
    document.getElementById('page-dashboard').style.display = 'block';
    document.getElementById('admin-bar').style.display = 'block';
    document.getElementById('ov-date').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    initOverview();
    updateEssayBadge();
    updateAppBadge();
  }

  function pwScore(pw){return [{ok:pw.length>=8},{ok:/[A-Z]/.test(pw)},{ok:/[0-9]/.test(pw)},{ok:/[!@#$%^&*()\-_=+\[\]{};:,.<>?]/.test(pw)}].filter(r=>r.ok).length;}
  function applyBar(pw,id){const s=pwScore(pw);const c=['','var(--danger)','var(--warning)','#9ab800','var(--success)'];const b=document.getElementById(id);b.style.width=s*25+'%';b.style.background=c[s]||'';}
  function checkSetupPw(){applyBar(document.getElementById('setup-pass').value,'setup-bar');}
  function checkCpPw(){applyBar(document.getElementById('cp-new').value,'cp-bar');}

  document.getElementById('a-pass')?.addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});

  async function doLogin() {
    const email = document.getElementById('a-email').value.trim();
    const pass = document.getElementById('a-pass').value;
    const err = document.getElementById('login-err');
    err.style.display = 'none';
    if (!email || !pass) { err.textContent = 'Please fill in all fields.'; err.style.display = 'flex'; return; }
    const btn = document.getElementById('login-btn');
    btn.disabled = true; btn.textContent = 'Verifying…';
    const res = await SC.auth.login(email, pass);
    btn.disabled = false; btn.textContent = 'Access Admin Panel →';
    if (res.error) { err.textContent = res.error; err.style.display = 'flex'; return; }
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('page-2fa').style.display = 'flex';
    document.getElementById('tfa-email-display').textContent = email;
  }

  async function doSetup() {
    const p=document.getElementById('setup-pass').value;
    const c=document.getElementById('setup-conf').value;
    const err=document.getElementById('setup-err');err.style.display='none';
    if(p!==c){err.textContent='Passwords do not match.';err.style.display='flex';return;}
    const pwErr=validatePassword(p);
    if(pwErr){err.textContent=pwErr;err.style.display='flex';return;}
    const{error}=await sb.auth.updateUser({password:p});
    if(error){err.textContent=error.message;err.style.display='flex';return;}
    showGlobalToast('Password set! Logging you in…','success');
    setTimeout(()=>showDashboard(),800);
  }

  function showTab(name){
    document.querySelectorAll('.tab-pane').forEach(p=>p.style.display='none');
    document.querySelectorAll('.anav-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('tab-'+name).style.display='block';
    const tabs=['overview','orders','users','essays','applications','security','logs','settings','messages'];
    const btns=document.querySelectorAll('.anav-btn');
    const i=tabs.indexOf(name);if(btns[i])btns[i].classList.add('active');
    if(name==='orders')renderOrders();
    if(name==='users')renderUsers('client');
    if(name==='essays')renderEssays('pending');
    if(name==='applications')renderApplications();
    if(name==='security')renderSecurity();
    if(name==='logs')renderLogs();
    if(name==='settings')loadSettings();
    if(name==='messages')renderMessages();
  }

  // ── Overview ───────────────────────────────────────────────
  async function initOverview() {
    const stats=await SC.stats.get();
    document.getElementById('ov-stats').innerHTML=`
      <div class="stat-card"><div class="stat-value" style="color:var(--success)">$${stats.revenue.toFixed(0)}</div><div class="stat-label">Gross Revenue</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--navy2)">$${stats.net.toFixed(0)}</div><div class="stat-label">Net Revenue</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--gold)">$${stats.escrow.toFixed(0)}</div><div class="stat-label">In Escrow</div></div>
      <div class="stat-card"><div class="stat-value">${stats.totalOrders}</div><div class="stat-label">Total Orders</div></div>
      <div class="stat-card"><div class="stat-value">${stats.activeOrders}</div><div class="stat-label">Active Orders</div></div>
      <div class="stat-card"><div class="stat-value">${stats.clients}</div><div class="stat-label">Clients</div></div>
      <div class="stat-card"><div class="stat-value">${stats.writers}</div><div class="stat-label">Writers</div></div>
      <div class="stat-card"><div class="stat-value" style="color:${stats.disputes>0?'var(--danger)':'inherit'}">${stats.disputes}</div><div class="stat-label">Disputes</div></div>`;
    const {data:orders}=await SC.orders.getAll();
    const s=await SC.settings.get();const pw=parseFloat(s.writer_payout||4);
    const labels=[],rev=[],pay=[];
    for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);labels.push(d.toLocaleDateString('en',{month:'short',day:'numeric'}));const day=(orders||[]).filter(o=>o.status==='completed'&&new Date(o.created_at).toDateString()===d.toDateString());rev.push(day.reduce((a,o)=>a+Number(o.total_price),0));pay.push(day.reduce((a,o)=>a+pw*o.page_count,0));}
    const c1=document.getElementById('rev-chart').getContext('2d');
    if(window._rc)window._rc.destroy();
    window._rc=new Chart(c1,{type:'line',data:{labels,datasets:[{label:'Revenue',data:rev,borderColor:'#0f2040',backgroundColor:'rgba(15,32,64,0.08)',fill:true,tension:0.4},{label:'Payouts',data:pay,borderColor:'#d4a840',backgroundColor:'rgba(212,168,64,0.08)',fill:true,tension:0.4}]},options:{plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}},responsive:true}});
    const sc={};(orders||[]).forEach(o=>{sc[o.status]=(sc[o.status]||0)+1;});
    const c2=document.getElementById('status-chart').getContext('2d');
    if(window._sc)window._sc.destroy();
    window._sc=new Chart(c2,{type:'doughnut',data:{labels:Object.keys(sc).map(s=>s.replace(/_/g,' ')),datasets:[{data:Object.values(sc),backgroundColor:['#e8a020','#6b9fd4','#3a9e6e','#d4a840','#0f2040','#e05555','#8898b8']}]},options:{plugins:{legend:{position:'right'}},responsive:true}});
    const {data:escData}=await sb.from('escrow').select('*,orders(order_number)').eq('status','held').limit(6);
    const esc=escData||[];
    const escCountEl = document.getElementById('ov-escrow-count');
    if (escCountEl) escCountEl.textContent = esc.length + ' active';
    document.getElementById('ov-escrow').innerHTML=esc.length?esc.map(e=>`<div class="flex-between" style="padding:10px 0;border-bottom:1px solid var(--border);font-size:0.82rem"><div><strong>${e.orders?.order_number||e.order_id}</strong><div class="text-xs text-muted">${e.payment_method||'—'}</div></div><span class="badge badge-gold">$${e.amount}</span></div>`).join('')+'<div style="text-align:center;padding:8px 0;font-size:0.8rem;color:var(--muted)">Showing up to 6 latest</div>':'<p class="text-muted text-sm">No active escrow holdings.</p>';
    const logs=await SC.security.getLogs();
    document.getElementById('ov-activity').innerHTML=logs.slice(0,8).map(l=>`<div style="display:grid;grid-template-columns:130px 1fr 100px;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);font-size:0.78rem"><span class="fw-700" style="color:var(--navy2)">${l.action}</span><span class="text-muted">${l.detail||'—'}</span><span class="text-muted">${l.ip_address||'—'}</span></div>`).join('');
  }

  // ── Orders ─────────────────────────────────────────────────
  let assignOrdId=null,disputeOrdId=null,refundOrdId=null;
  let allOrdersCache = [];

  async function renderOrders(){
    const filter=document.getElementById('ord-filter').value;
    const search=document.getElementById('ord-search').value.toLowerCase();
    const{data:orders}=await SC.orders.getAll(filter);
    // Enrich with brief_files
    if (orders && orders.length) {
      const ids = orders.map(o=>o.id);
      const {data:bf} = await sb.from('orders').select('id,brief_files,brief_url').in('id',ids);
      if (bf) bf.forEach(b=>{ const o=orders.find(x=>x.id===b.id); if(o){o.brief_files=b.brief_files||[];o.brief_url=o.brief_url||b.brief_url;} });
    }
    allOrdersCache = orders || [];
    // Fetch writer request counts for all orders
    if (allOrdersCache.length) {
      const { data: reqCounts } = await sb.from('order_requests')
        .select('order_id')
        .in('order_id', allOrdersCache.map(o=>o.id));
      if (reqCounts) {
        const countMap = {};
        reqCounts.forEach(r => { countMap[r.order_id] = (countMap[r.order_id]||0) + 1; });
        allOrdersCache.forEach(o => { o.request_count = countMap[o.id] || 0; });
      }
    }
    let list=allOrdersCache;
    if(search) list=list.filter(o=>
      o.order_number.toLowerCase().includes(search)||
      o.subject.toLowerCase().includes(search)||
      (o.writer?.full_name||'').toLowerCase().includes(search)||
      (o.client?.full_name||'').toLowerCase().includes(search)
    );
    const tbody=document.getElementById('ord-tbody');
    if(!list.length){tbody.innerHTML='<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--muted)">No orders found</td></tr>';return;}
    tbody.innerHTML=list.map(o=>{
      const cl=o.client||{};const wr=o.writer||{};
      const dl=Math.ceil((new Date(o.deadline)-Date.now())/86400000);
      const delivery=o.deliveries;
      const hasFile = delivery?.file_url;
      // Parse brief_files safely
      let bfs = o.brief_files;
      if (typeof bfs === 'string') { try { bfs = JSON.parse(bfs); } catch(e) { bfs = []; } }
      const hasBriefs = Array.isArray(bfs) && bfs.length > 0;
      return `<tr>
        <td><strong style="font-size:0.85rem">${o.order_number}</strong></td>
        <td>
          <span class="tag" style="font-size:0.72rem">${o.subject}</span><br>
          <span class="text-xs text-muted">${o.paper_type||'Essay'} · ${o.academic_level}</span>
          ${o.word_count?`<br><span class="text-xs text-muted">${o.word_count.toLocaleString()} words</span>`:''}
          ${o.request_count>0?`<br><span class="badge badge-gold" style="margin-top:3px;font-size:0.7rem">✋ ${o.request_count} request${o.request_count>1?'s':''}</span>`:''}
        </td>
        <td><div style="font-size:0.82rem;font-weight:600">${cl.full_name||'?'}</div><div style="font-size:0.75rem;color:var(--danger)">${cl.email||''}</div></td>
        <td style="font-size:0.82rem">${o.page_count}p<br><strong>$${o.total_price}</strong><br><span class="text-xs text-muted">dep $${o.deposit_amount}</span></td>
        <td><span class="badge status-${o.status}" style="font-size:0.72rem">${o.status.replace(/_/g,' ')}</span>${o.is_urgent?'<br><span class="badge badge-warning" style="margin-top:3px;font-size:0.7rem">⚡</span>':''}</td>
        <td style="font-size:0.82rem">${wr.full_name||'<span class="text-muted">Unassigned</span>'}</td>
        <td style="font-size:0.82rem">
          ${hasFile?`<a href="${delivery.file_url}" target="_blank" class="btn btn-sm btn-outline" style="font-size:0.72rem">📄 Final</a>${delivery.plagiarism_score?`<br><span class="badge badge-success" style="margin-top:4px;font-size:0.7rem">${delivery.plagiarism_score}% orig</span>`:''}`:'-'}
          ${hasBriefs?`<br><button class="btn btn-sm btn-navy" style="font-size:0.7rem;margin-top:3px" onclick="event.stopPropagation();viewBriefFiles(${o.id})">📎 ${bfs.length} File${bfs.length>1?'s':''}</button>`:''}
        </td>
        <td style="font-size:0.78rem;color:${dl<=1?'var(--danger)':'var(--muted)'}">${new Date(o.deadline).toLocaleDateString()}<br>${dl}d left</td>
        <td><div style="display:flex;gap:4px;flex-wrap:wrap">
          <button class="btn btn-sm btn-primary" onclick="openAssign(${o.id},'${o.order_number}','${o.subject}',${o.page_count})">Assign</button>
          <button class="btn btn-sm btn-outline" onclick="viewOrder(${JSON.stringify(o).replace(/"/g,'&quot;')})">View</button>
          <button class="btn btn-sm btn-navy" onclick="openOrderReply(${o.id},'${o.order_number}','${(wr.id||'')}','${(cl.id||'')}')">💬 Reply</button>
          ${o.status==='disputed'?`<button class="btn btn-sm btn-danger" onclick="openDispute(${o.id},'${o.order_number}','${o.dispute_reason||''}')">Resolve</button>`:''}
          ${o.deposit_paid&&!['completed','refunded'].includes(o.status)?`<button class="btn btn-sm btn-ghost" style="color:var(--danger)" onclick="openRefund(${o.id},'${o.order_number}',${o.deposit_amount})">Refund</button>`:''}
        </div></td>
      </tr>`;
    }).join('');
  }

  function handleAssignRequest(btn) {
    const orderId = parseInt(btn.dataset.oid);
    const idx = parseInt(btn.dataset.idx);
    const reqs = window._adminWriterReqs && window._adminWriterReqs[orderId];
    if (!reqs || !reqs[idx]) return;
    const r = reqs[idx];
    const writerName = (r.profiles && r.profiles.full_name) ? r.profiles.full_name : 'Writer';
    confirmAssignFromModal(orderId, r.writer_id, writerName);
  }

  async function assignFromRequest(orderId, idx) {
    const reqs = window._writerRequests && window._writerRequests[orderId];
    if (!reqs || !reqs[idx]) return;
    const r = reqs[idx];
    const writerId = r.writer_id;
    const writerName = r.profiles?.full_name || 'Writer';
    await confirmAssignFromModal(orderId, writerId, writerName);
  }

  async function adminConfirmPayment(orderId, orderNum, amount, method) {
    if (!confirm('Confirm ' + method + ' payment of $' + amount + ' for order ' + orderNum + '?')) return;
    const res = await SC.orders.payDeposit(orderId, method);
    if (res.error) { showGlobalToast('Error: ' + res.error, 'error'); return; }
    closeM('m-ord');
    showGlobalToast('✅ Payment confirmed! Order ' + orderNum + ' is now active.', 'success');
    renderOrders();
  }

  async function confirmAssignFromModal(orderId, writerId, writerName) {
    if (!confirm('Assign ' + writerName + ' to this order?')) return;
    const res = await SC.orders.assign(orderId, writerId);
    if (res.error) { showGlobalToast(res.error, 'error'); return; }
    closeM('m-ord');
    showGlobalToast(writerName + ' assigned successfully!', 'success');
    renderOrders();
  }

  async function openAssign(id,num,subj,pages){
    assignOrdId=id;
    document.getElementById('assign-info').innerHTML=`<strong>${num}</strong> – ${subj} · ${pages} pages`;
    const writers=await SC.users.getAll('writer');
    const approved=writers.filter(w=>w.is_writer_approved);
    document.getElementById('assign-sel').innerHTML='<option value="">— Select Writer —</option>'+approved.map(w=>`<option value="${w.id}">${w.full_name} (${w.email})</option>`).join('');
    openM('m-assign');
  }
  async function confirmAssign(){
    const wid=document.getElementById('assign-sel').value;
    if(!wid){showGlobalToast('Select a writer.','error');return;}
    const res=await SC.orders.assign(assignOrdId,wid);
    if(res.error){showGlobalToast(res.error,'error');return;}
    closeM('m-assign');showGlobalToast('Writer assigned!','success');renderOrders();
  }

  // Open reply modal pre-filled with order number in subject
  async function openOrderReply(orderId, orderNumber, writerId, clientId) {
    // Switch to messages tab and pre-fill
    showTab('messages');
    await new Promise(r => setTimeout(r, 300));
    document.getElementById('msg-subject').value = `Re: Order ${orderNumber}`;
    // Try to pre-select the writer if available
    if (writerId) {
      const sel = document.getElementById('msg-recipient');
      for (let opt of sel.options) { if (opt.value === writerId) { opt.selected = true; break; } }
    }
    document.getElementById('msg-content').focus();
    showGlobalToast(`Composing reply for order ${orderNumber}`, 'success');
  }

  function viewOrder(o){ currentViewOrder = o;
    document.getElementById('m-ord-title').textContent=o.order_number;
    const cl=o.client||{};const wr=o.writer||{};
    const delivery=o.deliveries;
    document.getElementById('m-ord-body').innerHTML=`
      <div class="grid-2" style="gap:12px;margin-bottom:14px">
        <div><div class="form-label" style="color:var(--danger)">🔒 CLIENT (CONFIDENTIAL)</div><div style="background:rgba(224,85,85,0.05);border:1px solid rgba(224,85,85,0.2);border-radius:6px;padding:12px;font-size:0.875rem"><strong>${cl.full_name||'?'}</strong><br><span style="color:var(--danger)">${cl.email||''}</span><br>IP: ${cl.last_ip||'?'} · Logins: ${cl.login_count||0}<br>Consent: ${cl.consent_given?'✓':'✗'}</div></div>
        <div><div class="form-label">WRITER</div><div style="background:var(--parch);border-radius:6px;padding:12px;font-size:0.875rem">${wr.full_name?`<strong>${wr.full_name}</strong><br><span style="color:var(--muted)">${wr.email||''}</span>`:'<em class="text-muted">Unassigned</em>'}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:0.82rem;margin-bottom:12px">
        <div><strong>Topic:</strong> ${o.title||'—'}</div>
        <div><strong>Type:</strong> ${o.paper_type||'Essay'}</div>
        <div><strong>Subject:</strong> ${o.subject} → ${o.sub_level||'General'}</div>
        <div><strong>Level:</strong> ${o.academic_level}</div>
        <div><strong>Citation:</strong> ${o.citation_style||'APA'}</div>
        <div><strong>Language:</strong> ${o.language||'English (US)'}</div>
        <div><strong>Spacing:</strong> ${o.spacing||'Double'}</div>
        <div><strong>Size:</strong> ${o.word_count?o.word_count.toLocaleString()+' words / ':''} ${o.page_count} pages</div>
        <div><strong>Sources:</strong> ${o.sources_required||0}</div>
        <div><strong>Add-ons:</strong> ${o.addons?.length?o.addons.join(', '):'None'}</div>
        <div><strong>Total:</strong> $${o.total_price}${o.discount_percent?' (-'+o.discount_percent+'%)':''}</div>
        <div><strong>Deposit:</strong> ${o.deposit_paid?`✓ $${o.deposit_amount} via ${o.payment_method}`:'Not paid'}</div>
        <div><strong>Status:</strong> <span class="badge status-${o.status}">${o.status}</span></div>
        <div><strong>Plagiarism:</strong> ${delivery?.plagiarism_score?delivery.plagiarism_score+'% original':'Not checked'}</div>
      </div>
      ${delivery?.file_url?`<div style="margin-bottom:12px"><a href="${delivery.file_url}" target="_blank" class="btn btn-outline btn-sm">📄 Download Submitted Work</a>${delivery.notes_to_client?`<div style="margin-top:8px;font-size:0.82rem;color:var(--muted)"><strong>Writer notes:</strong> ${delivery.notes_to_client}</div>`:''}</div>`:''}
      <div class="flex-between" style="margin-bottom:6px">
        <div class="form-label">Instructions</div>
        <button class="btn btn-sm btn-outline" onclick="viewOrderInstructions(currentViewOrder)">📄 View Full</button>
      </div>
      <div style="background:var(--parch);border-radius:6px;padding:12px;font-size:0.82rem;line-height:1.7;max-height:100px;overflow:hidden;position:relative">
        ${(o.instructions||'—').slice(0,200)}${(o.instructions||'').length>200?'…':''}
      </div>
      ${(() => {
        let bf = o.brief_files;
        if (typeof bf === 'string') { try { bf = JSON.parse(bf); } catch(e) { bf = []; } }
        if (Array.isArray(bf) && bf.length) {
          return `<div style="margin-top:10px"><div class="form-label">📎 Client Uploaded Files</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${bf.map(f=>`<a href="${f.url}" target="_blank" class="btn btn-outline btn-sm" style="gap:6px">📄 ${f.name}</a>`).join('')}</div></div>`;
        }
        return o.brief_url ? `<div style="margin-top:10px"><a href="${o.brief_url}" target="_blank" class="btn btn-outline btn-sm">📎 Download Client Brief</a></div>` : '';
      })()}
      ${o.dispute_reason?`<div class="alert alert-danger" style="margin-top:12px">⚠️ <strong>Dispute:</strong> ${o.dispute_reason}</div>`:''}
      <div id="modal-requests-${o.id}" style="margin-top:14px"></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
        ${!o.deposit_paid ? '<button class=\"btn btn-success btn-sm\" onclick=\"adminConfirmPayment('+o.id+',\''+o.order_number+'\','+o.deposit_amount+',\'bank\')\">✅ Confirm Bank Payment</button><button class=\"btn btn-sm btn-outline\" onclick=\"adminConfirmPayment('+o.id+',\''+o.order_number+'\','+o.deposit_amount+',\'paypal\')\">🅿️ Confirm PayPal</button>' : ''}
        ${(o.status==='pending_writer'||o.status==='pending_payment') ? '<button class=\"btn btn-gold btn-sm\" onclick=\"closeM(\'m-ord\');openAssign('+o.id+',\''+o.order_number+'\',\''+o.subject+'\','+o.page_count+')\">✍️ Assign Writer</button>' : ''}
        ${(o.deposit_paid&&!['completed','refunded','cancelled'].includes(o.status)) ? '<button class=\"btn btn-sm btn-ghost\" style=\"color:var(--danger)\" onclick=\"openRefund('+o.id+',\''+o.order_number+'\','+o.deposit_amount+')\">💸 Refund</button>' : ''}
      </div>\`;
    // Load writer requests for this order
    sb.from('order_requests').select('*, profiles(full_name, email, is_writer_approved)').eq('order_id', o.id).then(({data:reqs}) => {
      const el = document.getElementById('modal-requests-'+o.id);
      if (!el) return;
      if (!reqs || !reqs.length) {
        el.innerHTML = '<div class="text-muted text-sm" style="margin-top:8px">No writer requests yet.</div>';
        return;
      }
      // Use data attributes to avoid quote escaping issues
      window._adminWriterReqs = window._adminWriterReqs || {};
      window._adminWriterReqs[o.id] = reqs;
      let html = '<div style="font-weight:600;font-size:0.82rem;margin-bottom:8px">Writer Requests (' + reqs.length + ')</div>';
      reqs.forEach((r, i) => {
        const wName = (r.profiles && r.profiles.full_name) ? r.profiles.full_name : 'Writer';
        const wEmail = (r.profiles && r.profiles.email) ? r.profiles.email : '';
        html += '<div class="flex-between" style="padding:8px;background:var(--parch);border-radius:8px;margin-bottom:6px">'
          + '<div><strong style="font-size:0.875rem">' + wName + '</strong>'
          + '<div class="text-xs text-muted">' + wEmail + '</div></div>'
          + '<button class="btn btn-sm btn-gold" data-oid="' + o.id + '" data-idx="' + i + '" onclick="handleAssignRequest(this)">Assign</button>'
          + '</div>';
      });
      el.innerHTML = html;
    });
    openM('m-ord');
  }

  async function openDispute(id,num,reason){
    disputeOrdId=id;
    document.getElementById('disp-info').innerHTML=`<strong>${num}</strong><br>Reason: <em style="color:var(--danger)">${reason||'Not specified'}</em>`;
    const{data:msgs}=await SC.messages.getForOrder(id);
    document.getElementById('disp-chat').innerHTML=(msgs||[]).length?(msgs).map(m=>`<div style="padding:4px 0;border-bottom:1px solid var(--border)"><strong>${m.sender_role}:</strong> ${m.content} <span style="float:right;color:var(--muted)">${new Date(m.created_at).toLocaleTimeString()}</span></div>`).join(''):'<p class="text-muted text-sm">No messages.</p>';
    openM('m-dispute');
  }
  async function confirmDispute(){
    const note=document.getElementById('disp-note').value.trim();
    if(!note){showGlobalToast('Please enter a decision note.','error');return;}
    const res=await SC.orders.resolveDispute(disputeOrdId,document.getElementById('disp-res').value,note);
    if(res.error){showGlobalToast(res.error,'error');return;}
    closeM('m-dispute');showGlobalToast('Dispute resolved!','success');renderOrders();
  }

  function openRefund(id,num,amt){refundOrdId=id;document.getElementById('refund-info').innerHTML=`<strong>${num}</strong> – Deposit: <strong>$${amt}</strong>`;openM('m-refund');}
  async function confirmRefund(){
    const reason=document.getElementById('refund-reason').value.trim();
    if(!reason){showGlobalToast('Please provide a reason.','error');return;}
    const res=await SC.orders.refund(refundOrdId,reason);
    if(res.error){showGlobalToast(res.error,'error');return;}
    closeM('m-refund');showGlobalToast('Refund issued!','success');renderOrders();
  }

  // ── Users ──────────────────────────────────────────────────
  let curUserTab='client';
  let removeUserId=null, removeUserName='';

  async function renderUsers(role){
    curUserTab=role;
    ['client','writer'].forEach(r=>{
      const btn=document.getElementById('ut-'+r);
      if(btn) btn.style.borderBottomColor=r===role?'var(--navy2)':'transparent';
    });
    const searchEl=document.getElementById('user-search');
    const search=(searchEl?.value||'').toLowerCase();
    const utbody=document.getElementById('user-tbody');
    utbody.innerHTML='<tr><td colspan="7" style="text-align:center;padding:20px"><div class="spinner" style="margin:0 auto"></div></td></tr>';
    let { data: users, error } = await sb.from('profiles').select('*').eq('user_type', role).order('created_at', { ascending: false });
    if(error){console.error('Users error:',error);utbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--danger)">Error: '+error.message+'</td></tr>';return;}
    users = users || [];
    if(search) users=users.filter(u=>((u.full_name||'')+(u.email||'')).toLowerCase().includes(search));
    if(!users.length){utbody.innerHTML='<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--muted)">No users found</td></tr>';return;}
    utbody.innerHTML=users.map(u=>`<tr>
      <td><div class="flex-gap"><div class="avatar">${(u.full_name||'?').charAt(0)}</div><div><strong style="font-size:0.875rem">${u.full_name}</strong></div></div></td>
      <td style="color:var(--danger);font-size:0.82rem"><strong>${u.email}</strong></td>
      <td style="font-size:0.78rem;color:var(--muted)">${u.last_ip||'—'}<br>${u.updated_at?new Date(u.updated_at).toLocaleString():'Never'}</td>
      <td><span class="badge ${u.is_active?'badge-success':'badge-danger'}">${u.is_active?'Active':'Suspended'}</span>${role==='writer'?`<br><span class="badge ${u.is_writer_approved?'badge-success':'badge-warning'}" style="margin-top:3px">${u.is_writer_approved?'Approved':'Pending'}</span>`:''}</td>
      <td><span class="badge badge-navy">✓ 2FA</span><br>${u.consent_given?'<span class="badge badge-success" style="margin-top:3px">✓ Consent</span>':'<span class="badge badge-danger" style="margin-top:3px">✗</span>'}</td>
      <td style="font-size:0.82rem;color:var(--muted)">${new Date(u.created_at).toLocaleDateString()}</td>
      <td><div style="display:flex;gap:4px;flex-wrap:wrap">
        <button class="btn btn-sm ${u.is_active?'btn-outline':'btn-success'}" onclick="toggleUser('${u.id}',${!u.is_active})">${u.is_active?'Suspend':'Activate'}</button>
        ${role==='writer'&&!u.is_writer_approved?`<button class="btn btn-sm btn-gold" onclick="approveWriter('${u.id}')">Approve</button>`:''}
        <button class="btn btn-sm btn-primary" onclick="quickMessage('${u.id}','${u.full_name}')">✉ Message</button>
        <button class="btn btn-sm btn-danger" onclick="openRemoveUser('${u.id}','${u.full_name}')">🗑 Remove</button>
      </div></td>
    </tr>`).join('');
  }

  function quickMessage(userId, userName) {
    showTab('messages');
    setTimeout(() => {
      document.getElementById('msg-recipient').value = userId;
      document.getElementById('msg-subject').focus();
      showGlobalToast(`Composing message to ${userName}`, 'success');
    }, 300);
  }

  function openRemoveUser(id, name) {
    removeUserId = id;
    removeUserName = name;
    document.getElementById('remove-user-info').innerHTML = `<strong>User:</strong> ${name}<br><span class="text-sm text-muted">This user will be permanently deactivated and blocked from the platform.</span>`;
    document.getElementById('remove-reason').value = '';
    openM('m-remove-user');
  }

  async function confirmRemoveUser() {
    const reason = document.getElementById('remove-reason').value.trim();
    if (!reason) { showGlobalToast('Please provide a reason for removal.', 'error'); return; }
    // Deactivate user and log the removal
    await SC.users.update(removeUserId, { is_active: false, removal_reason: reason, removed_at: new Date().toISOString() });
    await sb.from('security_logs').insert({
      user_id: removeUserId,
      action: 'user_removed',
      detail: `Admin removed user "${removeUserName}". Reason: ${reason}`,
    });
    closeM('m-remove-user');
    showGlobalToast(`${removeUserName} has been removed from the platform.`, 'success');
    renderUsers(curUserTab);
  }

  async function toggleUser(id,active){await SC.users[active?'activate':'suspend'](id);renderUsers(curUserTab);showGlobalToast(active?'User activated.':'User suspended.',active?'success':'warning');}
  async function approveWriter(id){await SC.users.update(id,{is_writer_approved:true});renderUsers('writer');updateEssayBadge();showGlobalToast('Writer approved!','success');}

  // ── Essays ──────────────────────────────────────────────────
  let reviewingEssayId=null,reviewingWriterId=null;

  async function renderEssays(status){
    ['pending','approved','rejected'].forEach(s=>document.getElementById('et-'+s).classList.toggle('active',s===status));
    const el=document.getElementById('essays-list');
    el.innerHTML='<div class="loading"><div class="spinner"></div></div>';

    let essays = [];
    if (status === 'pending') {
      const { data: pd } = await sb.from('writer_test_results').select('*, profiles(full_name, email)').eq('test_type', 'essay').is('admin_approved', null).order('completed_at', { ascending: false }); essays = pd || [];
    } else if (status === 'approved') {
      const { data } = await sb.from('writer_test_results')
        .select('*, profiles(full_name, email)')
        .eq('test_type', 'essay')
        .eq('admin_approved', true)
        .order('completed_at', { ascending: false });
      essays = data || [];
    } else if (status === 'rejected') {
      const { data } = await sb.from('writer_test_results')
        .select('*, profiles(full_name, email)')
        .eq('test_type', 'essay')
        .eq('admin_approved', false)
        
        .order('completed_at', { ascending: false });
      essays = data || [];
    }

    if(!essays.length){el.innerHTML=`<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/></svg><h3>No ${status} essays</h3></div>`;return;}

    el.innerHTML=essays.map(e=>`<div class="card" style="margin-bottom:14px">
      <div class="flex-between" style="margin-bottom:10px">
        <div>
          <div class="fw-700">${e.profiles?.full_name||'Writer'} <span class="text-muted text-sm">· ${e.profiles?.email||''}</span></div>
          <div style="margin-top:6px"><span class="badge badge-navy">${e.subject}</span> <span class="badge badge-muted" style="margin-left:4px">${e.sub_level||'General'}</span>
          ${status==='approved'?'<span class="badge badge-success" style="margin-left:4px">✓ Approved</span>':''}
          ${status==='rejected'?'<span class="badge badge-danger" style="margin-left:4px">✗ Rejected</span>':''}
          </div>
          ${e.admin_note?`<div style="margin-top:6px;font-size:0.82rem;color:var(--muted)"><strong>Feedback:</strong> ${e.admin_note}</div>`:''}
        </div>
        <div class="flex-gap">
          ${status==='pending'?`<button class="btn btn-primary btn-sm" onclick="openEssayReview(${e.id},'${e.writer_id}','${e.profiles?.full_name||''}','${e.subject}','${e.sub_level||'General'}')">Read &amp; Review</button><button class="btn btn-success btn-sm" onclick="quickApprove(${e.id},'${e.writer_id}')">Quick ✓</button>`:''}
          ${status!=='pending'?`<button class="btn btn-outline btn-sm" onclick="openEssayReview(${e.id},'${e.writer_id}','${e.profiles?.full_name||''}','${e.subject}','${e.sub_level||'General'}')">View Essay</button>`:''}
        </div>
      </div>
      <div style="background:var(--parch);border-radius:6px;padding:10px;font-size:0.8rem;line-height:1.7;max-height:70px;overflow:hidden;color:var(--muted)">${(e.essay_text||'No text — file upload only').slice(0,280)}…</div>
    </div>`).join('');
  }

  async function updateEssayBadge(){
    const { data: pending } = await sb.from('writer_test_results')
      .select('id', { count: 'exact' })
      .eq('test_type', 'essay')
      .is('admin_approved', null);
    const count = pending?.length || 0;
    const b=document.getElementById('essay-badge');
    b.textContent=count;
    b.style.display=count>0?'inline-flex':'none';
  }

  function openEssayReview(id,writerId,name,subj,sl){
    reviewingEssayId=id;reviewingWriterId=writerId;
    document.getElementById('er-header').innerHTML=`<strong>${name}</strong> · ${subj} → ${sl}`;
    sb.from('writer_test_results').select('essay_text,admin_note,file_url').eq('id',id).single().then(({data})=>{
      const fileLink = data?.file_url ? `<br><br><a href="${data.file_url}" target="_blank" style="color:#2e75b6;font-weight:bold;">📎 Download Uploaded Essay File</a>` : '';
      document.getElementById('er-text').innerHTML=`<strong>ESSAY:</strong><br><br>${(data?.essay_text||'No content typed.').replace(/\n/g,'<br>')}${fileLink}`;
      document.getElementById('er-note').value=data?.admin_note||'';
    });
    openM('m-essay');
  }

  async function doEssayReview(approved){
    const note=document.getElementById('er-note').value.trim();
    if(!note){showGlobalToast('Please provide feedback for the writer.','error');return;}
    const res=await SC.tests.reviewEssay(reviewingEssayId,reviewingWriterId,approved?'approved':'rejected',note);
    if(res.error){showGlobalToast(res.error,'error');return;}
    closeM('m-essay');showGlobalToast(`Essay ${approved?'approved':'rejected'}!`,approved?'success':'error');
    renderEssays('pending');updateEssayBadge();
  }

  async function quickApprove(id,wid){
    await SC.tests.reviewEssay(id,wid,'approved','Approved by admin.');
    showGlobalToast('Essay approved!','success');renderEssays('pending');updateEssayBadge();
  }

  // ── Writer Applications Window ─────────────────────────────
  async function renderApplications() {
    // Fetch directly from DB to get latest value
    const { data: appSetting } = await sb.from('platform_settings')
      .select('value').eq('key', 'applications_open').single();
    const rawVal = appSetting?.value;
    const isOpen = rawVal === true || rawVal === 'true' || rawVal === 1 || rawVal === '1';
    const s = await SC.settings.get();
    s.applications_open = isOpen;
    const openDate = s.applications_open_date || '';
    const closeDate = s.applications_close_date || '';
    const appMessage = s.applications_message || '';

    document.getElementById('app-open-date').value = openDate;
    document.getElementById('app-close-date').value = closeDate;
    document.getElementById('app-message').value = appMessage;

    document.getElementById('app-window-status').innerHTML = isOpen
      ? `<div class="window-status-open">✅ Writer Applications are currently OPEN — new writers can register and apply</div>`
      : `<div class="window-status-closed">🚫 Writer Applications are currently CLOSED — new writer registrations are paused</div>`;

    document.getElementById('app-window-controls').innerHTML = isOpen
      ? `<button class="btn btn-danger" onclick="closeApplicationWindow()">🚫 Close Applications Now</button>`
      : `<button class="btn btn-success" onclick="openApplicationWindow()">✅ Open Applications Now</button>`;

    // Load pending writer applicants
    const writers = await SC.users.getAll('writer');
    const pending = writers.filter(w => !w.is_writer_approved && w.is_active);
    const el = document.getElementById('pending-applications');
    if (!pending.length) { el.innerHTML = '<p class="text-muted text-sm">No pending writer applications.</p>'; return; }
    // Fetch credentials for pending writers
    const writerIds = pending.map(w => w.id);
    let credsMap = {};
    if (writerIds.length) {
      const { data: credsData } = await sb.from('profiles')
        .select('id, id_url, cert_url, selfie_url, resume_url, credentials_submitted_at, bio')
        .in('id', writerIds);
      (credsData||[]).forEach(c => credsMap[c.id] = c);
    }

    el.innerHTML = pending.map(w => {
      const c = credsMap[w.id] || {};
      const hasAllCreds = c.id_url && c.cert_url && c.selfie_url && c.resume_url;
      return `<div style="border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:12px">
        <div class="flex-between" style="margin-bottom:12px">
          <div>
            <strong>${w.full_name}</strong> <span class="text-muted text-sm">· ${w.email}</span>
            <div class="text-xs text-muted">Applied: ${new Date(w.created_at).toLocaleDateString()}</div>
            ${c.bio ? `<div class="text-sm" style="margin-top:4px;color:var(--muted)">${c.bio}</div>` : ''}
          </div>
          <div class="flex-gap">
            <button class="btn btn-sm btn-gold" onclick="approveWriter('${w.id}')" ${!hasAllCreds?'title="Missing credentials"':''}>✓ Approve</button>
            <button class="btn btn-sm btn-outline" onclick="toggleUser('${w.id}',false)">✗ Reject</button>
            <button class="btn btn-sm btn-primary" onclick="quickMessage('${w.id}','${w.full_name}')">✉ Message</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
          ${[['🪪 National ID','id_url'],['🎓 Certificate','cert_url'],['🤳 Selfie','selfie_url'],['📄 Resume','resume_url']].map(([label,key]) =>
            `<div style="background:var(--parch);border-radius:8px;padding:8px;text-align:center;font-size:0.78rem">
              <div style="margin-bottom:4px">${label}</div>
              ${c[key] ? `<a href="${c[key]}" target="_blank" class="btn btn-sm btn-outline" style="font-size:0.72rem">View 👁</a>` : '<span class="badge badge-danger">Missing</span>'}
            </div>`
          ).join('')}
        </div>
        ${!hasAllCreds ? '<div class="alert alert-warning" style="margin-top:8px;padding:8px"><span>⚠️</span><span style="font-size:0.82rem">Some credentials are missing. You can still approve but review carefully.</span></div>' : '<div class="alert alert-success" style="margin-top:8px;padding:8px"><span>✅</span><span style="font-size:0.82rem">All credentials submitted.</span></div>'}
      </div>`;
    }).join('');
  }

  async function openApplicationWindow() {
    await SC.settings.update({ applications_open: true });
    showGlobalToast('Writer applications are now OPEN!', 'success');
    renderApplications();
  }

  async function closeApplicationWindow() {
    await SC.settings.update({ applications_open: false });
    showGlobalToast('Writer applications are now CLOSED.', 'warning');
    renderApplications();
  }

  async function saveAppWindowSettings() {
    const openDate = document.getElementById('app-open-date').value;
    const closeDate = document.getElementById('app-close-date').value;
    const message = document.getElementById('app-message').value.trim();
    await SC.settings.update({
      applications_open_date: openDate,
      applications_close_date: closeDate,
      applications_message: message,
    });
    showGlobalToast('Application window settings saved!', 'success');
  }

  async function updateAppBadge() {
    const writers = await SC.users.getAll('writer');
    const pending = writers.filter(w => !w.is_writer_approved && w.is_active);
    const b = document.getElementById('app-badge');
    b.textContent = pending.length;
    b.style.display = pending.length > 0 ? 'inline-flex' : 'none';
  }

  // ── Security ───────────────────────────────────────────────
  async function renderSecurity(){
    const[blocked,orders,ws]=await Promise.all([SC.security.getBlocked(),SC.orders.getAll('disputed'),SC.withdrawals.getAll()]);
    const disp=(orders.data||[]);
    const pend=ws.filter(w=>w.status==='pending');
    document.getElementById('sec-blocked').textContent=blocked.length;
    document.getElementById('sec-disputes').textContent=disp.length;
    document.getElementById('sec-withdrawals').textContent=pend.length;
    document.getElementById('bl-count').textContent=blocked.length;
    document.getElementById('blocked-list').innerHTML=blocked.length?blocked.map(b=>`<div style="border:1px solid rgba(224,85,85,0.2);background:rgba(224,85,85,0.03);border-radius:8px;padding:12px;margin-bottom:8px">
      <div class="flex-between" style="margin-bottom:6px">
        <div class="flex-gap"><span class="badge badge-danger">⚠️ BLOCKED</span><span class="fw-600 text-sm">${b.profiles?.full_name||b.user_id}</span><span class="tag" style="font-size:0.72rem">Order ${b.order_id}</span></div>
        <div class="flex-gap">
          <button class="btn btn-sm btn-primary" onclick="messageBlockedUser('${b.user_id}','${(b.profiles?.full_name||'User').replace(/'/g,'')}')" title="Message this user">✉ Message</button>
          <span class="text-xs text-muted">${new Date(b.created_at).toLocaleString()}</span>
        </div>
      </div>
      <div style="font-size:0.82rem;color:var(--danger);background:rgba(224,85,85,0.06);padding:8px;border-radius:6px">"${b.blocked_content||b.detail}"</div>
    </div>`).join(''):'<div class="empty-state" style="padding:20px"><p class="text-sm">No blocked messages 🎉</p></div>';
    document.getElementById('disputes-list').innerHTML=disp.length?disp.map(o=>{const cl=o.client||{};return `<div class="card card-sm" style="margin-bottom:10px"><div class="flex-between"><div><strong>${o.order_number}</strong> – ${o.subject}<br><span class="text-sm text-muted">Client: ${cl.full_name||'?'} · <span style="color:var(--danger)">${(o.dispute_reason||'').slice(0,80)}</span></span></div><button class="btn btn-sm btn-primary" onclick="openDispute(${o.id},'${o.order_number}','${o.dispute_reason||''}')">Resolve</button></div></div>`;}).join(''):'<p class="text-muted text-sm">No active disputes.</p>';
    document.getElementById('withdrawals-list').innerHTML=pend.length?pend.map(w=>{const u=w.profiles||{};return `<div class="flex-between" style="padding:10px 0;border-bottom:1px solid var(--border);font-size:0.875rem"><div><strong>${u.full_name||'Writer'}</strong> · $${w.amount} via ${w.method}<br><span class="text-xs text-muted">${w.account_details}</span></div><div class="flex-gap"><button class="btn btn-sm btn-success" onclick="approveWithdrawal('${w.id}')">✓ Release</button><button class="btn btn-sm btn-ghost" onclick="denyWithdrawal('${w.id}')">✗ Deny</button></div></div>`;}).join(''):'<p class="text-muted text-sm">No pending withdrawals.</p>';
  }

  // ── Messages ───────────────────────────────────────────────
  let adminActiveConv = null;
  let allConversations = [];
  let allUsers = [];

  async function renderMessages() {
    allUsers = await SC.users.getAll();
    const sel = document.getElementById('msg-recipient');
    sel.innerHTML = '<option value="">Select user...</option>';
    allUsers.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = `${u.full_name} (${u.user_type}) — ${u.email}`;
      sel.appendChild(opt);
    });

    const [sent, received] = await Promise.all([
      sb.from('direct_messages').select('*').eq('sender_id', adminProfile.id).order('created_at', { ascending: false }),
      sb.from('direct_messages').select('*').eq('recipient_id', adminProfile.id).order('created_at', { ascending: false })
    ]);

    const allMsgs = [...(sent.data||[]), ...(received.data||[])];
    const conversations = {};
    allMsgs.forEach(m => {
      const convId = m.conversation_id || m.id;
      if (!conversations[convId]) conversations[convId] = [];
      conversations[convId].push(m);
    });

    allConversations = Object.entries(conversations).map(([id, msgs]) => {
      msgs.sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
      const otherUserId = msgs[0]?.sender_id === adminProfile.id ? msgs[0]?.recipient_id : msgs[0]?.sender_id;
      const otherUser = allUsers.find(u => u.id === otherUserId);
      return { id, msgs, latest: msgs[msgs.length-1], otherUser, otherUserId };
    }).sort((a,b) => new Date(b.latest.created_at) - new Date(a.latest.created_at));

    const unreadCount = (received.data||[]).filter(m => !m.is_read).length;
    const badge = document.getElementById('msg-badge');
    if (badge) { badge.textContent = unreadCount; badge.style.display = unreadCount > 0 ? 'inline-flex' : 'none'; }

    renderConversationList(allConversations, received.data||[]);
  }

  function renderConversationList(convs, receivedMsgs) {
    const hist = document.getElementById('msg-history');
    if (!convs.length) { hist.innerHTML = '<p class="text-muted text-sm">No conversations yet.</p>'; return; }
    hist.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px" id="admin-conv-list">
      ${convs.map(c => {
        const latest = c.latest;
        const isUnread = receivedMsgs.some(m => m.conversation_id === c.id && !m.is_read);
        const isMine = latest.sender_id === adminProfile.id;
        const userName = c.otherUser ? `${c.otherUser.full_name} (${c.otherUser.user_type})` : latest.sender_name || 'User';
        return `<div onclick="openAdminConv('${c.id}')" id="aconv-${c.id}" style="padding:12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;background:${isUnread?'var(--parch)':'transparent'}">
          <div class="flex-between" style="margin-bottom:2px">
            <strong style="font-size:0.82rem">${userName}</strong>
            <span class="text-xs text-muted">${new Date(latest.created_at).toLocaleDateString()}</span>
          </div>
          <div style="font-size:0.8rem;font-weight:600;color:var(--navy2);margin-bottom:2px">${latest.subject||'Message'}</div>
          <div style="font-size:0.78rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${isMine?'You: ':userName+': '}${latest.content}</div>
          ${isUnread?'<span class="badge badge-warning" style="margin-top:4px;font-size:0.7rem">New Reply</span>':''}
        </div>`;
      }).join('')}
    </div>`;
  }

  function filterConversations() {
    const q = document.getElementById('msg-search').value.toLowerCase();
    if (!q) { renderConversationList(allConversations, []); return; }
    const filtered = allConversations.filter(c => {
      const userName = (c.otherUser?.full_name || '').toLowerCase();
      const email = (c.otherUser?.email || '').toLowerCase();
      const subject = (c.latest?.subject || '').toLowerCase();
      const content = c.msgs.some(m => m.content.toLowerCase().includes(q));
      return userName.includes(q) || email.includes(q) || subject.includes(q) || content;
    });
    renderConversationList(filtered, []);
  }

  async function openAdminConv(convId) {
    adminActiveConv = convId;
    document.querySelectorAll('[id^="aconv-"]').forEach(el => el.style.border = '1px solid var(--border)');
    const convEl = document.getElementById('aconv-'+convId);
    if (convEl) convEl.style.border = '1px solid var(--gold)';

    const result = await sb.from('direct_messages').select('*').eq('conversation_id', convId).order('created_at', { ascending: true });
    const allMsgs = result.data || [];
    const subject = allMsgs[0]?.subject || 'Conversation';
    const otherUserId = allMsgs[0]?.sender_id === adminProfile.id ? allMsgs[0]?.recipient_id : allMsgs[0]?.sender_id;
    const otherUser = allUsers.find(u => u.id === otherUserId);
    const userName = otherUser ? `${otherUser.full_name} (${otherUser.user_type})` : allMsgs[0]?.sender_name || 'User';

    const composeCard = document.getElementById('compose-card');
    composeCard.innerHTML = `
      <div class="flex-between" style="margin-bottom:14px">
        <div>
          <h3 style="font-family:var(--font-display)">${subject}</h3>
          <div class="text-sm text-muted">${userName}</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="renderMessages()">← Back to list</button>
      </div>
      <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden">
        <div id="admin-conv-msgs" style="height:320px;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px">
          ${allMsgs.map(m => {
            const isMine = m.sender_id === adminProfile.id;
            return `<div style="display:flex;flex-direction:column;align-items:${isMine?'flex-end':'flex-start'}">
              <div style="max-width:75%;padding:10px 14px;border-radius:${isMine?'12px 12px 2px 12px':'12px 12px 12px 2px'};background:${isMine?'var(--navy)':'var(--parch)'};color:${isMine?'white':'var(--ink)'};font-size:0.875rem">${m.content}</div>
              <div style="font-size:0.75rem;color:var(--muted);margin-top:3px">${isMine?'You':userName} · ${new Date(m.created_at).toLocaleString('en-US',{dateStyle:'short',timeStyle:'short'})}</div>
            </div>`;
          }).join('')}
        </div>
        <div style="padding:10px;border-top:1px solid var(--border);display:flex;gap:8px">
          <input type="text" class="form-input" id="admin-reply-input" placeholder="Type reply…" style="flex:1" onkeydown="if(event.key==='Enter')sendAdminReply('${convId}','${otherUserId}','${subject.replace(/'/g,"\\'")}')">
          <button class="btn btn-primary" onclick="sendAdminReply('${convId}','${otherUserId}','${subject.replace(/'/g,"\\'")}')">Send</button>
        </div>
      </div>`;

    const msgs = document.getElementById('admin-conv-msgs');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
    await sb.from('direct_messages').update({ is_read: true }).eq('recipient_id', adminProfile.id).eq('conversation_id', convId);
  }

  async function sendAdminReply(convId, recipientId, subject) {
    const input = document.getElementById('admin-reply-input');
    const content = input.value.trim();
    if (!content) return;
    const { error } = await sb.from('direct_messages').insert({
      sender_id: adminProfile.id, recipient_id: recipientId,
      sender_role: 'admin',
      subject: subject.startsWith('Re:') ? subject : 'Re: ' + subject,
      content, conversation_id: convId, is_read: false,
    });
    if (error) { showGlobalToast(error.message,'error'); return; }
    input.value = '';
    openAdminConv(convId);
  }

  async function sendDirectMessage() {
    const recipientId = document.getElementById('msg-recipient').value;
    const subject = document.getElementById('msg-subject').value.trim();
    const content = document.getElementById('msg-content').value.trim();
    const err = document.getElementById('msg-err');
    err.style.display = 'none';
    if (!recipientId) { err.textContent = 'Please select a recipient.'; err.style.display = 'flex'; return; }
    if (!content) { err.textContent = 'Please write a message.'; err.style.display = 'flex'; return; }
    const convId = crypto.randomUUID();
    const { error } = await sb.from('direct_messages').insert({
      sender_id: adminProfile.id, recipient_id: recipientId,
      sender_role: 'admin', subject, content, conversation_id: convId,
    });
    if (error) { err.textContent = error.message; err.style.display = 'flex'; return; }
    document.getElementById('msg-subject').value = '';
    document.getElementById('msg-content').value = '';
    document.getElementById('msg-recipient').value = '';
    showGlobalToast('Message sent successfully!', 'success');
    renderMessages();
  }

  function messageBlockedUser(userId, userName) {
    showTab('messages');
    setTimeout(() => {
      const sel = document.getElementById('msg-recipient');
      for (let opt of sel.options) { if (opt.value === userId) { opt.selected = true; break; } }
      document.getElementById('msg-subject').value = 'Warning: Contact Information Policy Violation';
      document.getElementById('msg-content').value = `Dear ${userName},\n\nOur system has flagged a message in one of your orders that appears to contain personal contact information. This is a violation of ScholarConnect's platform policy.\n\nPlease note:\n• All communication must remain within the platform\n• Sharing personal contact details (phone, email, social media) is strictly prohibited\n• Repeated violations may result in account suspension\n\nThis is an automated warning. Please review our Terms of Service.\n\nScholarConnect Team`;
      document.getElementById('msg-content').focus();
      showGlobalToast('Warning message pre-filled for ' + userName, 'warning');
    }, 500);
  }

  async function approveWithdrawal(id){await SC.withdrawals.updateStatus(id,'paid','Approved by admin');showGlobalToast('Withdrawal released!','success');renderSecurity();}
  async function denyWithdrawal(id){await SC.withdrawals.updateStatus(id,'rejected','Denied by admin');showGlobalToast('Withdrawal denied.','warning');renderSecurity();}

  // ── Logs ───────────────────────────────────────────────────
  async function renderLogs(){
    const filter=document.getElementById('log-filter').value;
    const search=document.getElementById('log-search').value.toLowerCase();
    let logs=await SC.security.getLogs();
    if(filter)logs=logs.filter(l=>l.action===filter);
    if(search)logs=logs.filter(l=>(l.detail||'').toLowerCase().includes(search)||(l.profiles?.full_name||'').toLowerCase().includes(search));
    const tbody=document.getElementById('log-tbody');
    if(!logs.length){tbody.innerHTML='<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--muted)">No logs found</td></tr>';return;}
    const colors={blocked_message:'var(--danger)',failed_login:'var(--danger)',user_removed:'var(--danger)'};
    tbody.innerHTML=logs.slice(0,300).map(l=>`<tr>
      <td style="font-size:0.78rem;color:var(--muted);white-space:nowrap">${new Date(l.created_at).toLocaleString()}</td>
      <td style="font-size:0.82rem"><strong>${l.profiles?.full_name||l.user_id||'System'}</strong></td>
      <td><span class="badge badge-muted">${l.profiles?.user_type||'?'}</span></td>
      <td><span style="font-weight:700;font-size:0.78rem;color:${colors[l.action]||'var(--navy2)'}">${l.action}</span></td>
      <td style="font-size:0.8rem;color:var(--muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.detail||'—'}</td>
      <td style="font-size:0.78rem;color:var(--muted);font-family:monospace">${l.ip_address||'—'}</td>
    </tr>`).join('');
  }

  // ── Settings ───────────────────────────────────────────────
  async function loadSettings(){
    // Always fetch fresh from DB
    const { data: rawSettings } = await sb.from('platform_settings').select('key, value');
    const s = {};
    if (rawSettings) rawSettings.forEach(r => { s[r.key] = r.value; });
    document.getElementById('s-std').value = s.standard_rate||10;
    document.getElementById('s-urg').value = s.urgent_rate||15;
    document.getElementById('s-thresh').value = s.urgent_threshold_days||5;
    document.getElementById('s-pay').value = s.writer_payout||4;
    document.getElementById('s-max').value = s.max_active_orders||10;
    document.getElementById('s-auto').value = s.auto_approve_hours||72;
    document.getElementById('s-pp').value = s.paypal_email||'jameskinyua1997@gmail.com';
    document.getElementById('s-bn').value=s.bank_name||'';
    document.getElementById('s-ba').value=s.bank_account||'';
    document.getElementById('s-bs').value=s.bank_sort||'';
    document.getElementById('s-bw').value=s.bank_swift||'';
    const stats=await SC.stats.get();
    document.getElementById('rev-summary').innerHTML=`<div style="display:flex;flex-direction:column;gap:10px">
      <div class="flex-between" style="padding:10px;background:var(--parch);border-radius:8px"><span>Gross Revenue</span><strong>$${stats.revenue.toFixed(0)}</strong></div>
      <div class="flex-between" style="padding:10px;background:var(--parch);border-radius:8px"><span>Writer Payouts</span><strong>$${stats.payout.toFixed(0)}</strong></div>
      <div class="flex-between" style="padding:12px;background:linear-gradient(135deg,rgba(58,158,110,0.08),transparent);border-radius:8px;border:1px solid var(--border)"><span class="fw-700">Net Revenue</span><strong style="font-size:1.2rem;color:var(--success)">$${stats.net.toFixed(0)}</strong></div>
      <div class="flex-between" style="padding:10px;background:var(--parch);border-radius:8px"><span>In Escrow</span><strong style="color:var(--gold)">$${stats.escrow.toFixed(0)}</strong></div>
    </div>`;
  }

  async function saveSettings(){
    const updates = {
      standard_rate: document.getElementById('s-std').value,
      urgent_rate: document.getElementById('s-urg').value,
      urgent_threshold_days: document.getElementById('s-thresh').value,
      writer_payout: document.getElementById('s-pay').value,
      max_active_orders: document.getElementById('s-max').value,
      auto_approve_hours: document.getElementById('s-auto').value,
      paypal_email: document.getElementById('s-pp').value,
      bank_name: document.getElementById('s-bn').value,
      bank_account: document.getElementById('s-ba').value,
      bank_sort: document.getElementById('s-bs').value,
      bank_swift: document.getElementById('s-bw').value,
    };
    // Save each setting as individual row in platform_settings
    for (const [key, value] of Object.entries(updates)) {
      await sb.from('platform_settings').upsert(
        { key, value: String(value) },
        { onConflict: 'key' }
      );
    }
    showGlobalToast('Settings saved! Changes take effect immediately for all users.', 'success');
    SC.settings._cache = null;
    loadSettings();
  }

  async function changePassword(){
    const curr=document.getElementById('cp-curr').value;
    const np=document.getElementById('cp-new').value;
    const conf=document.getElementById('cp-conf').value;
    const err=document.getElementById('cp-err');err.style.display='none';
    if(!curr){err.textContent='Please enter your current password.';err.style.display='flex';return;}
    if(np!==conf){err.textContent='New passwords do not match.';err.style.display='flex';return;}
    if(np.length < 8){err.textContent='Min 8 characters required.';err.style.display='flex';return;}
    // Re-sign in with current password to get fresh session
    const{error:signInErr}=await sb.auth.signInWithPassword({email:'solutionscenter29@gmail.com',password:curr});
    if(signInErr){err.textContent='Current password incorrect: '+signInErr.message;err.style.display='flex';return;}
    const{error}=await sb.auth.updateUser({password:np});
    if(error){err.textContent=error.message;err.style.display='flex';return;}
    showGlobalToast('Password updated successfully!','success');
    document.getElementById('cp-curr').value='';
    document.getElementById('cp-new').value='';
    document.getElementById('cp-conf').value='';
  }

  async function exportCSV(){
    const{data:orders}=await SC.orders.getAll('completed');
    const s=await SC.settings.get();const pw=parseFloat(s.writer_payout||4);
    let csv='Order #,Subject,Level,Pages,Client Price,Deposit,Writer Payout,Net,Payment,Date\n';
    (orders||[]).forEach(o=>{csv+=`"${o.order_number}","${o.subject}","${o.academic_level}",${o.page_count},${o.total_price},${o.deposit_amount},${pw*o.page_count},${o.total_price-pw*o.page_count},"${o.payment_method||''}","${new Date(o.created_at).toLocaleDateString()}"\n`;});
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='scholarconnect-revenue.csv';a.click();
    showGlobalToast('Revenue CSV exported!','success');
  }

  // Store current order being viewed
  let currentViewOrder = null;

  function viewBriefFiles(orderId) {
    const o = allOrdersCache.find(x => x.id === orderId);
    if (!o) return;
    let bf = o.brief_files;
    if (typeof bf === 'string') { try { bf = JSON.parse(bf); } catch(e) { bf = []; } }
    openInstructions(o.order_number + ' — Brief Files', o.subject, o.instructions || '', bf || []);
  }

  function viewOrderInstructions(o) {
    if (!o) return;
    let bf = o.brief_files;
    if (typeof bf === 'string') { try { bf = JSON.parse(bf); } catch(e) { bf = []; } }
    openInstructions(
      o.order_number + ' — Full Instructions',
      o.subject + ' · ' + o.academic_level + ' · ' + o.page_count + ' pages',
      o.instructions || 'No instructions provided.',
      bf || []
    );
  }

  function openInstructions(title, meta, instructions, briefFiles) {
    document.getElementById('m-inst-title').textContent = title;
    document.getElementById('m-inst-meta').textContent = meta;
    document.getElementById('m-inst-body').textContent = instructions || 'No instructions provided.';
    const filesEl = document.getElementById('m-inst-files');
    if (briefFiles && briefFiles.length) {
      let bf = briefFiles;
      if (typeof bf === 'string') { try { bf = JSON.parse(bf); } catch(e) { bf = []; } }
      if (Array.isArray(bf) && bf.length) {
        filesEl.innerHTML = `<div style="font-weight:600;margin-bottom:8px">📎 Uploaded Files:</div>` +
          bf.map(f => `<a href="${f.url}" target="_blank" class="btn btn-outline btn-sm" style="margin-bottom:6px;display:inline-flex;gap:6px;margin-right:8px">📄 ${f.name}</a>`).join('');
      } else filesEl.innerHTML = '';
    } else filesEl.innerHTML = '';
    openM('m-instructions');
  }

  function openM(id){document.getElementById(id).classList.add('open');}
  function closeM(id){document.getElementById(id).classList.remove('open');}
</script>
</body>
</html>
