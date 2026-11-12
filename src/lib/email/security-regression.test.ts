import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('queue RPC grants exclude browser roles while preserving email processing', () => {
  const sql = readFileSync('drizzle/migrations/0001_restrict_email_queue_rpc_execution.sql', 'utf8')
  for (const signature of [
    'move_to_dlq(text, text, bigint, jsonb)',
    'read_email_batch(text, integer, integer)',
    'delete_email(text, bigint)',
    'enqueue_email(text, jsonb)',
  ]) {
    assert.ok(sql.includes(`REVOKE EXECUTE ON FUNCTION public.${signature} FROM PUBLIC, anon, authenticated;`))
    assert.ok(sql.includes(`GRANT EXECUTE ON FUNCTION public.${signature} TO service_role;`))
  }
})

test('unsubscribe update failures log no token or raw database error', () => {
  const source = readFileSync('src/routes/email/unsubscribe.ts', 'utf8')
  const failureBranch = source.match(/if \(updateError\) \{([\s\S]*?)\n        \}/)?.[1]
  assert.ok(failureBranch)
  assert.ok(failureBranch.includes("console.error('Failed to mark unsubscribe token as used')"))
  const logCall = failureBranch.match(/console\.error\([^\n]+/)?.[0]
  assert.ok(logCall)
  assert.doesNotMatch(logCall, /\{\s*error:|,\s*token\s*[},)]|updateError/)
})